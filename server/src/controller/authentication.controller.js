import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import FacebookTokenStragegy from "passport-facebook-token";
import passport from "passport";
import User from "../models/User";
import config from "../config";
import VerifyToken from "../_helper/VerifyToken";
import randomString from "randomstring";
import mailer from "../_helper/mailer";
import { getMe, loginUser, loginUserWithFB, registerUser, verifyWithSecretToken } from "../service/authentication.service";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// TODO: Refactor to controller and service like the other 2

//Passport strategy for facebook login
passport.use(
  "facebookToken",
  new FacebookTokenStragegy(
    {
      clientID: config.clientID,
      clientSecret: config.clientSecret,
    },
    function (accessToken, refreshToken, profile, done) {
      var user = { name: profile._json.name, email: profile._json.email };
      return done(null, user);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

router.use(passport.initialize());
router.use(passport.session());

//Fb login or create user
router.post(
  "/facebook/login",
  passport.authenticate("facebookToken"),loginUserWithFB);

//New user registration
router.post("/register", registerUser);

//Login registered users;
router.post("/login",loginUser);

//Email verification of registered users
router.get("/verify/:secretToken", verifyWithSecretToken);

//Get info of the current user
router.get("/me", VerifyToken, getMe);

export default router;
