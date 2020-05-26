var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  imageLocation: String,
}, {
  timestamps: true,
});

mongoose.model("Item", ItemSchema);

module.exports = mongoose.model("Item");
