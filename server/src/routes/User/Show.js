import express from 'express';
import bodyParser from 'body-parser';
import User from '../../models/User';

const Show = express.Router();
Show.use(bodyParser.urlencoded({ extended: true }));
Show.use(bodyParser.json());

Show.get('/', (req, res) => {
	User.find({}, (err, users) => {
		if (err) return res.status(500).send(err);
		res.status(200).send(users);
	});
});

Show.get('/:id', (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if (err) return res.status(500).send(err);
		if (!user) return res.status(404).send('No user found.');
		res.status(200).send(user);
	});
});

export default Show;
