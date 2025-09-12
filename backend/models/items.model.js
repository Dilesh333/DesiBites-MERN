import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Snacks",
        "Main Course",
        "Desserts",
        "Pizza",
        "Burger",
        "Sandwich",
        "South Indian",
        "North Indian",
        "Chinese",
        "Beverages",
        "Fast Food",
        "Others",
      ],
      required: true,
    },
    Price:{
        type: Number,
        minimum: 0,
        required: true,
    },
    foodType:{
        type: String,
        enum: ["Veg", "Non-Veg"],
        required: true,
    }
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;