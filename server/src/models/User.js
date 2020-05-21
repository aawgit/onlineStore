import mongoose from 'mongoose';

const User = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			lowercase: true,
			required: true,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		secretToken: String,
		isActivated: Boolean,
	},
	{
		timestamps: true,
	}
);

User.virtual('items', {
	ref: 'Item',
	foreignField: 'owner',
	localField: '_id',
});

export default mongoose.model('User', User);
