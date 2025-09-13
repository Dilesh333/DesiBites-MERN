import express from "express";
import { createEditShop } from "../controllers/shopController.js";
import isAuth from "../middlewares/isAuth.js";
import { addItem } from "../controllers/itemController.js";
import { upload } from "../middlewares/multer.js";


const itemRouter = express.Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), addItem);
itemRouter.post("/edit-item/:itemId", isAuth, upload.single("image"), addItem);

export default itemRouter;
