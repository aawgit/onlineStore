import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../../models/User.js';

const Login = express.Router();

Login.use(bodyParser.urlencoded({ extended: false }));
Login.use(bodyParser.json());

Login.post('*', (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (err) return res.status(500).send(err);

		if (!user)
			return res.status(404).send({
				auth: false,
				token: null,
				message: 'No user found in the database!',
			});

		if (!user.isActivated) {
			return res.status(401).send({
				auth: false,
				token: null,
				message: 'Please verify the email address first',
			});
		}

		if (!bcrypt.compareSync(req.body.password, user.password)) {
			return res.status(401).send({
				auth: false,
				token: null,
				message: "Password didn't match!",
			});
		}

		res.status(200).send({
			auth: true,
			token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
				expiresIn: 86400,
			}),
			id: user._id,
			name: user.name,
		});
	});
});

export default Login;
