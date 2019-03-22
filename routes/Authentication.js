// AuthController.js
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var User = require("../models/User");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../config/jwtConfig");
var VerifyToken = require("../_helper/VerifyToken");
var randomString = require("randomstring");
var mailer = require("../_helper/mailer");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//New user registration
router.post("/register", function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (user) {
      return res.status(409).json({
        message: "This e-mail address is already registered."
      });
    } else {
      var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      //Create token for email verification
      const secretToken = randomString.generate();

      User.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          //For email verification
          secretToken: secretToken,
          isActivated: false
        },
        function(err, user) {
          if (err)
            return res
              .status(500)
              .send("There was a problem registering the user.");
          // create a token
          //var token = jwt.sign({ id: user._id }, config.secret, {
          //  expiresIn: 86400 // expires in 24 hours
          //});
          res.status(200).send(user.email);
          const mailOptions = {
            from: "support@mirrorwall.org", // sender address
            to: user.email, // list of receivers
            subject: "Please verify the email address", // Subject line
            html: `<h4>Thank you for registering.<h4>
            <p>Please verify this email address by clicking the following link</p>
            <a href="https://frozen-lake-54898.herokuapp.com/api/auth/verify/${user.secretToken}">
            https://frozen-lake-54898.herokuapp.com/api/auth/verify/${user.secretToken}</a>`
          };

          mailer.sendMail(mailOptions);
        }
      );
    }
  });
});

//Login registered users;
router.post("/login", function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");
    if (!user.isActivated) {
      //console.log("activation", user, user.isActivated);
      return res.status(401).send("Please verify the email address first");
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      //console.log("password", req.body.password, passwordIsValid);
      return res.status(401).send({ auth: false, token: null });
    }
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token, userId:user._id, name:user.name });
  });
});

//Email verification of registered users
router.get("/verify/:secretToken", function(req, res) {
  User.findOne({ secretToken: req.params.secretToken }, function(err, user) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");

    user.isActivated = true;
    user.secretToken = "";

    user.save(function(err, user) {
      if (err) return res.status(500).send("Error verifying the account");
      res.redirect("http://localhost:3000/#/login/");
    });
  });
});

//Get info of the current user
router.get("/me", VerifyToken, function(req, res, next) {
  User.findById(req.userId, { password: 0 }, function(err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    res.status(200).send(user);
  });
});

module.exports = router;
