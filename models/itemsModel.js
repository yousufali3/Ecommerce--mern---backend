import mongoose from "mongoose";

const itemsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: Array,
      required: true,
    },
    highlights: {
      type: Array,
      required: true,
    },
    detail: {
      type: String,
    },
    image: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("item", itemsSchema);

export default Item;
