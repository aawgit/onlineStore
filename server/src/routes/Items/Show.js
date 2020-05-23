import express from 'express';
import bodyParser from 'body-parser';

import Item from '../../models/Item.js';

const Show = express.Router();

Show.use(bodyParser.urlencoded({ extended: true }));
Show.use(bodyParser.json());

Show.get('/:id', (req, res) => {
	Item.findById(req.params.id)
		.populate({ path: 'owner', select: 'name' })
		.exec((err, item) => {
			if (err) return res.status(500).send(err);
			if (!item) return res.status(404).send('No item found.');
			res.status(200).send(item);
		});
});

Show.get('/', (req, res) => {
	Item.find({})
		.populate({ path: 'owner', select: 'name' })
		.exec((err, items) => {
			if (err) return res.status(500).send(err);
			res.status(200).send(items);
		});
});

export default Show;
