import nodemailer from 'nodemailer';

/**
 * Available options
 *
 * - **from** - The email address of the sender. All email addresses can be plain ‘sender@server.com’ or formatted '“Sender Name” sender@server.com’, see Address object for details
 * - **to** - Comma separated list or an array of recipients email addresses that will appear on the To: field
 * - **subject** - The subject of the email
 * - **text** - The plaintext version of the message as an Unicode string, Buffer, Stream or an attachment-like object `{path: ‘/var/data/…'}`
 * - **html** - The HTML version of the message as an Unicode string, Buffer, Stream or an attachment-like object `{htmlStream: fs.createReadStream("content.html")}`
 * - **attachments** - An array of attachment objects (see [Using attachments](https://nodemailer.com/message/attachments/)) ) for details). Attachments can be used for embedding images as well.
 *
 * See more: [NodeMailer Message Configuration](https://nodemailer.com/message/)
 */

/* istambul ignore next */
export default (options) => {
	nodemailer
		.createTransport({
			host: process.env.MAIL_HOST,
			Port: process.env.MAIL_PORT,
			secure: true,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASSWORD,
			},
		})
		.sendMail(options, (err, info) => {
			if (err) {
				console.log(err);
				return err;
			}
			console.log(info);
			return info;
		});
};
