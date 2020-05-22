import express from 'express';
import bodyParser from 'body-parser';

import User from '../../models/User.js';

const Delete = express.Router();
Delete.use(bodyParser.urlencoded({ extended: true }));
Delete.use(bodyParser.json());

Delete.delete('/:id', (req, res) => {
	User.findByIdAndRemove(req.params.id, (err, user) => {
		if (err) return res.status(500).send(err);
		res.status(202).send(`Success. ${user.name} has been successfuly deleted!`);
	});
});

export default Delete;
