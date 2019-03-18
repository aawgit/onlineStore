var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: {type: String, trim: true},
  description: String,
  price: Number,
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model("Item", ItemSchema);

module.exports = mongoose.model("Item");