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
    return new Promise(function(resolve, reject) {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log("error: ", err);
          reject(err);
        } else {
          console.log(`Mail sent successfully!`);
          resolve(info);
        }
      });
    });
  }
};
