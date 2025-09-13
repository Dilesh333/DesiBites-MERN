import Item from "../models/items.model.js";
import Shop from "../models/shop.model.js";
import uploaOnCloudinary from "../utils/cloudinary.js";

export const addItem = async (req, res) => {
  try {
    const { name, category, price, foodType } = req.body;
    let image;
    if (req.file) {
      image = await uploaOnCloudinary(req.file.path);
    }
    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res.status(400).json({ message: "Shop Not Found" });
    }
    const item = await Item.create({
      name,
      category,
      price,
      foodType,
      image,
      shop: shop._id,
    });
  } catch (error) {
    return res.status(500).json({ message: `Add Item Error ${error}` });
  }
};

export const editItem = async (req, res) => {
  try {
    const { itemId } = req.params.itemId;
    const { name, category, price, foodType } = req.body;
    let image;
    if (req.file) {
      image = await uploaOnCloudinary(req.file.path);
    }
    const item = await Item.findByIdAndUpdate(
      itemId,
      {
        name,
        category,
        price,
        foodType,
        image,
      },
      { new: true }
    );
    if (!item) {
      return res.status(400).json({ message: "Item Not Found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: `Edit Item Error ${error}` });
  }
};
