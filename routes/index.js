var express = require('express');
var router = express.Router();
const way2sms = require('way2sms');
const handlebar = require('handlebars');
const nodemailer = require('nodemailer');

let smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
      user: req.body.email || process.env.SMTP_EMAIL,
      pass: req.body.pass || process.env.SMTP_PASSWORD
  }
});

var mailOptions = {
  to: recievers[i].email,
  subject: 'SMS logs',
  text: text,
  dsn: {
      id: recievers[i].id,
      return: 'headers',
      notify: ['failure', 'delay'],
      recipient: req.body.email
  },
  html: text
}

function sendemail(){
  smtpTransport.sendMail(mailOptions)
  .then(data => {
      //  console.log(data)
  }).catch(err => {
      // console.log(err)
      console.log("errorsmtptransport")
  });
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200)
    .send({
      "message": "Hello World"
    });
});

let recievers = [];

router.post('/', async function (req, res, next) {

  for (let i = 0; i < recievers.length; i++) {
    cookie = await way2sms.login(process.env.PHONE, process.env.PASSWORD);
    await way2sms.send(cookie, recievers[i].number, req.body.text);

    res.status(200)
      .send({
        "message": "Successfull Post"
      })
  }

});

module.exports = router;