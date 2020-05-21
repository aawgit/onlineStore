import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import Item from '../../models/Item';
import token from '../../utils/VerifyToken';

/**
 * Creates a new item in the storage with a timestamp. All
 * user uploads verified by a JWT token sent in the header.
 * Files automatically uploaded to Cloudinary storage. Only
 * one file per upload is allowed. All parameters required.
 *
 * **Request must be `HTTP-POST @ <root>/api/items/create`**
 *
 * @implements Item Schema
 * @returns MongoDB Response Object
 */
const Create = express.Router();

Create.use(bodyParser.urlencoded({ extended: true }));
Create.use(bodyParser.json());

Create.post('*', token, (req, res) => {
	Item.create(
		{
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			owner: req.id,
			image: req.body.file.secure_url,
			public_id: req.body.file.public_id,
		},
		(err, item) => {
			if (err) return res.status(500).send(err);
			res.status(201).send(item);
		}
	);
});

export default Create;
