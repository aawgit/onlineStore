import express from 'express';
import bodyParser from 'body-parser';

import User from '../../models/User.js';

const VerifyEmail = express.Router();

VerifyEmail.use(bodyParser.urlencoded({ extended: false }));
VerifyEmail.use(bodyParser.json());

VerifyEmail.get('/:token', (req, res) => {
	User.findOne({ token: req.params.token }, (err, user) => {
		if (err) return res.status(500).send(EvalError);
		if (!user) return res.status(404).send('No user found.');

		user.isActivated = true;
		user.token = '';

		user.save((err, user) => {
			if (err) return res.status(500).send(err);
			res.redirect(process.env.APP_URL + '/login');
		});
	});
});

export default VerifyEmail;
