import jwt from 'jsonwebtoken';

/**
 * Checks the request header for valid `JWT token` and if it is present,
 * decrypts it to `user.id` which will be attached to the request for the
 * ongoing operations.
 *
 * @returns * *User ID on success | Failed authentication response on error*
 */
export default (req, res, next) => {
	const token = req.headers['x-access-token'];
	if (!token) return res.status(403).send('No token provided.');
	jwt.verify(token, process.env.JWT_SECRET, (err, dec) => {
		if (err) return res.status(500).send(err);
		req.id = dec.id;
		next();
	});
};
