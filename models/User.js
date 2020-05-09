var mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
var UserSchema = new mongoose.Schema({  
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
    validate(value) {
      if (!isEmail(value)) {
        throw new Error(`Invalid value: email. Expected email address. Received ${ value }.`);
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  secretToken: String,
  isActivated: Boolean,
}, {
  timestamps: true,
});

UserSchema.virtual('items', {
  ref: 'Item',
  foreignField: 'owner',
  localField: '_id',
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');