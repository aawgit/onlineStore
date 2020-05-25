import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import randomString from 'randomstring';
import validator from 'validator';

import Mailer from '../../utils/Mailer.js';
import User from '../../models/User.js';

const Register = express.Router();

Register.use(bodyParser.urlencoded({ extended: false }));
Register.use(bodyParser.json());

Register.post('*', (req, res) => {
	const data = req.body;

	// validation
	if (
		!validator.isAlphanumeric(data.name) ||
		!validator.matches(data.password, /^[a-zA-Z]+$/) ||
		!validator.matches(data.password, /^[0-9]+$/) ||
		!validator.matches(data.password, /^[!@#$%&*()_+-=\[\]{}?]+$/) ||
		!validator.isEmail(data.email)
	)
		return res.status(406).json({
			message:
				'The values you entered seems invalid, please update them by the given criteria!',
		});

	// register
	User.findOne({ email: data.email }, (err, user) => {
		if (err) return res.status(500).send(err);

		if (user) {
			return res.status(409).json({
				message: `This e-mail address is already taken, please login to your account using <strong>${user.email}</strong>`,
			});
		} else {
			User.create(
				{
					name: data.name,
					email: data.email,
					password: bcrypt.hashSync(data.password, 8),
					token: randomString.generate(),
					isActivated: false,
				},
				(err, user) => {
					if (err) return res.status(500).send(err);

					Mailer({
						from: process.env.APP_EMAIL,
						to: user.email,
						subject: `ACCOUNT VERIFICATION ON ${process.env.APP_NAME.toUpperCase()}`,
						html: `	<p>Dear ${user.name}</p>
								<p>We recieived a registration request using this email address on ${process.env.APP_NAME}. 
								If it was not you, please ignore the contents and check your history for unusal activity on your account!
								<p>----------------------------------------------------------------------------------</p>
								<h4>Thank you for registering to our service! We are glad to see you as a new memeber of ${process.env.APP_NAME}!<h4>
								<p>As a last step of verification, please confirm your email address:</p>    
								<h5><a href="${process.env.APP_URL}/api/auth/verify/${user.token}">
            					I can confirm that this is my email address and only used by me</a></h5>`,
					});

					res.status(200).send(user);
				}
			);
		}
	});
});

export default Register;
