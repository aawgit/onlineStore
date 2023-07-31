import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config';
import User from '../models/User';
import randomString from 'randomstring';
import mailer from '../_helper/mailer';

export const loginUserWithFB = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email });
		if (!user) {
			user = await User.create(req.user);
		}
		var token = jwt.sign({ id: user._id }, config.secret, {
			expiresIn: 86400, // expires in 24 hours
		});
		return res.send({
			auth: true,
			token: token,
			userId: user._id,
			name: user.name,
		});
	} catch (err) {
		return res
			.status(500)
			.json({ message: `Problem in creating new user. Error: ${err}` });
	}
};

export const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const userExists = await User.findOne({ email });

		if (userExists) {
			return res
				.status(409)
				.json({ message: 'This e-mail is already registered' });
		}

		const hashedPassword = bcrypt.hashSync(password, 8);
		const secretToken = randomString({ length: 64 }); // Generate a 64-character secret token

		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
			// For email verification
			secretToken,
			isActivated: false,
		});

		if (newUser) {
			console.log(newUser);

			const verificationLink = `https://frozen-lake-54898.herokuapp.com/api/auth/verify/${secretToken}`;
			const mailOptions = {
				from: 'support@mirrorwall.org',
				to: newUser.email,
				subject: 'Please verify the email address',
				html: `<h4>Thank you for registering.<h4>
        <p>Please verify this email address by clicking the following link</p>
        <a href="${verificationLink}">${verificationLink}</a>`,
			};

			const mailResponse = await mailer.sendMail(mailOptions);

			if (mailResponse.messageId) {
				res.status(200).send(newUser.email);
			} else {
				await User.deleteOne({ email });
				throw new Error('Failed to send verification email');
			}
		}
	} catch (err) {
		console.log(err);
		await User.deleteOne({ email: req.body.email });
		return res.status(500).json({ message: 'Error. User Not registered' });
	}
};
export const loginUser = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		//console.log(config.clientID, config.clientSecret)
		if (!user) return res.status(404).send('No user found.');
		if (!user.isActivated) {
			//console.log("activation", user, user.isActivated);
			return res.status(401).send('Please verify the email address first');
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			//console.log("password", req.body.password, passwordIsValid);
			return res.status(401).send({ auth: false, token: null });
		}
		var token = jwt.sign({ id: user._id }, config.secret, {
			expiresIn: 86400, // expires in 24 hours
		});
		res
			.status(200)
			.send({ auth: true, token: token, userId: user._id, name: user.name });
	} catch (err) {
		return res.status(500).send('Error on the server.');
	}
};

export const verifyWithSecretToken = async (req, res) => {
	try {
		const user = await User.findOne({ secretToken: req.params.secretToken });

		if (!user) return res.status(404).send('No user found.');

		user.isActivated = true;
		user.secretToken = '';

		user.save(function (err, user) {
			if (err) return res.status(500).send('Error verifying the account');
			res.redirect('https://frozen-lake-54898.herokuapp.com/#/login/');
		});
	} catch (err) {
		return res.status(500).send('Error on the server.');
	}
};

export const getMe = (req, res) => {
	try {
		const user = User.findById(req.userId, { password: 0 });
		if (!user) return res.status(404).send('No user found.');
		res.status(200).send(user);
	} catch (err) {
		return res.status(500).send('There was a problem finding the user.');
	}
};
