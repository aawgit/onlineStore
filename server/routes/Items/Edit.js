import express from 'express';
import bodyParser from 'body-parser';

import Item from '../../models/Item.js';
import token from '../../utils/VerifyToken.js';

/**
 * Updates an item in the database by `{_id}.`. Item only
 * get updated when the requeseted item matches the user's
 * id. This is only a security check which already done on
 * the client side, that the request has not been mocked.
 *
 * **Request must be `HTTP-PUT @ <root>/api/items/edit/:id`**
 *
 * @implements Item Schema
 * @returns MongoDB Response Object
 */
const Edit = express.Router();

Edit.use(bodyParser.urlencoded({ extended: true }));
Edit.use(bodyParser.json());

Edit.put('/:id', token, (req, res) => {
	Item.findOneAndUpdate(
		{
			_id: req.params.id,
			owner: req.user.id,
		},
		req.body,
		{
			new: true,
		},
		(err, item) => {
			if (err) return res.status(500).send(err);
			res.status(200).send(item);
		}
	);
});

export default Edit;
