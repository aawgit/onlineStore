import express from 'express';
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';

import Item from '../../models/Item.js';
import token from '../../utils/VerifyToken.js';

/**
 * Removes an item from the database and Cloudinary storage by `{public_id}`.
 * Invoking user verified by a `JWT Token` sent in the header.
 *
 * **Request must be `HTTP-DELETE @ <root>/api/items/delete/:id`**
 *
 * @implements Item Schema
 * @returns Confirmation message
 */
const Delete = express.Router();

Delete.use(bodyParser.urlencoded({ extended: true }));
Delete.use(bodyParser.json());

Delete.delete('/:id', token, (req, res) => {
	/*cloudinary
		.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		})
		.uploader.destroy(req.params.id, (result) => {
			res.status(202).send(result);
		});*/

	Item.deleteOne({ public_id: req.params.id }, (err) => {
		if (err) return res.status(500).send(err);
		return res.status(202).send(`ID${req.params.id} Item has been removed!`);
	});
});

export default Delete;
