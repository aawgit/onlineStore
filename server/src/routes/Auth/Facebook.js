import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import FacebookTokenStragegy from 'passport-facebook-token';
import passport from 'passport';
import User from '../../models/User';

/**
 * Logs in a user if it has an entry in the database or creates a new,
 * bases on the Facebook data recieved. Sends back the user object
 * from the database with `JWT token` and given `_id`. This allows
 * perform actions which require specific privileges.
 *
 * **Request must be `HTTP-POST @ <root>/api/auth/facebook`**
 *
 * @implements User Schema
 * @returns User Object
 */
const Facebook = express.Router();

Facebook.use(bodyParser.urlencoded({ extended: false }));
Facebook.use(bodyParser.json());

passport.serializeUser(function (user, cb) {
	cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
	cb(null, obj);
});

passport.use(
	'facebookToken',
	new FacebookTokenStragegy(
		{
			clientID: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		},
		(accessToken, refreshToken, profile, done) => {
			return done(null, {
				name: profile._json.name,
				email: profile._json.email,
			});
		}
	)
);

Facebook.use(passport.initialize());
Facebook.use(passport.session());

Facebook.post('*', passport.authenticate('facebookToken'), (req, res) => {
	User.findOne({ email: req.user.email }, (err, user) => {
		if (err) return res.status(404).send(err);
		if (user) {
			return res.send({
				id: user._id,
				name: user.name,
				auth: true,
				token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
					expiresIn: 86400,
				}),
			});
		} else {
			User.create(req.user, (err, user) => {
				if (err) return res.status(500).send(err);
				if (user) {
					return res.status(201).send({
						id: user._id,
						name: user.name,
						auth: true,
						token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
							expiresIn: 86400,
						}),
					});
				}
			});
		}
	});
});

export default Facebook;
