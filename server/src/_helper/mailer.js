var nodemailer = require("nodemailer");
var config = require("../config");

var transporter = nodemailer.createTransport({
  host: config.MAIL_HOST,
  Port: config.MAIL_PORT,
  secure: true,
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASSWORD
  }
});

module.exports = {
  sendMail(mailOptions) {
    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
        return err;
      }
      console.log(info);
      return info;
    });
  }
};
