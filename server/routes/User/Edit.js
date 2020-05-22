import express from 'express';
import bodyParser from 'body-parser';

import User from '../../models/User.js';

const Edit = express.Router();
Edit.use(bodyParser.urlencoded({ extended: true }));
Edit.use(bodyParser.json());

Edit.put('/:id', (req, res) => {
	User.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
		(err, user) => {
			if (err) return res.status(500).send(err);
			res.status(200).send(user);
		}
	);
});
export default Edit;
