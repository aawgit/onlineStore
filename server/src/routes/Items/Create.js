import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import formidable from 'formidable';
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

import Item from '../../models/Item.js';
import token from '../../utils/VerifyToken.js';

/**
 * Creates a new item in the storage with a timestamp. All
 * user uploads verified by a JWT token sent in the header.
 * Files automatically uploaded to Cloudinary storage. Only
 * one file per upload is allowed. All parameters required.
 *
 * **Request must be `HTTP-POST @ <root>/api/items/create`**
 *
 * @todo Implementing cloudinary upload
 * @implements Item Schema
 * @returns MongoDB Response Object
 */
const Create = express.Router();

Create.use(bodyParser.urlencoded({ extended: true }));
Create.use(bodyParser.json());

Create.post('*', token, (req, res, next) => {
	const upload = (buffer, options) => {
		cloudinary.v2.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		});

		return new Promise((resolve, reject) => {
			let stream = cloudinary.v2.uploader.upload_stream(
				options,
				(error, result) => {
					if (result) {
						resolve(result);
					} else {
						reject(error);
					}
				}
			);
			fs.createReadStream(buffer).pipe(stream);
		});
	};

	const main = async (buffer, config) => await upload(buffer, config);

	const form = formidable();

	form.parse(req, (err, fields, files) => {
		console.log(files);
		if (err) return res.send(err);
		main(files.image.path, {})
			.then((result) => {
				Item.create(
					{
						name: fields.name,
						description: fields.description,
						price: fields.price,
						owner: fields.id,
						image: result.secure_url,
						public_id: result.public_id,
					},
					(err, item) => {
						if (err) return res.status(500).send(err);
						res.status(201).send(item);
					}
				);
			})
			.catch((err) => res.status(200).send(err));
	});
});

export default Create;
