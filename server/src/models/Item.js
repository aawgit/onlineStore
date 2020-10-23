import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
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

export default mongoose.model("Item");
