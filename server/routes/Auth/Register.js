import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import randomString from 'randomstring';

import Mailer from '../../utils/Mailer.js';
import User from '../../models/User.js';

const Register = express.Router();

Register.use(bodyParser.urlencoded({ extended: false }));
Register.use(bodyParser.json());

Register.post('*', (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (err) return res.status(500).send(err);

		if (user) {
			return res.status(409).json({
				message: 'This e-mail address is already registered.',
			});
		} else {
			User.create(
				{
					name: req.body.name,
					email: req.body.email,
					password: bcrypt.hashSync(req.body.password, 8),
					token: randomString.generate(),
					isActivated: false,
				},
				(err, user) => {
					if (err) return res.status(500).send(err);

					Mailer.sendMail({
						from: process.env.APP_EMAIL,
						to: user.email,
						subject: `Verification at ${process.env.APP_NAME}`,
						html: `	<h4>Thank you for registering to our service!<h4>
								<p>As a last step of verification, please confirm your email address:</p>    
								<h5><a href="${process.env.APP_URL}/api/auth/verify/${user.token}">
            					I can confirm that this is my email address and only used by me</a></h5>`,
					});

					res.status(200).send(user.email);
				}
			);
		}
	});
});

export default Register;
