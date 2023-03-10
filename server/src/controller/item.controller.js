import express from "express";
import bodyParser from "body-parser";
import {
  createItem,
  deleteImage,
  deleteItem,
  getItem,
  updateItem,
} from "../service/item.service";
import multer from "multer";
import cloudinary from "cloudinary";
import cloudinaryStorage from "multer-storage-cloudinary";
import config from "../config";
import VerifyToken from "../_helper/VerifyToken";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

const cloudStorage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "shopApp",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 400, height: 400, crop: "limit" }],
});
const cloudImageUpload = multer({ storage: cloudStorage });

//Image upload config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
    console.log(file);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage });

//image uploading with cloudinary

/* router.post("/image", cloudImageUpload.single("file"), function(req, res) {
  console.log(req.file)
}); */

router.delete("/image", (req, res) => {
  deleteImage();
});

/* router.post("/upload-image", upload.single("file"), function(req, res) {
  res.status("201").send("Uploaded");
}); */

// CREATES A NEW ITEM
router.post(
  "/",
  VerifyToken,
  cloudImageUpload.single("file"),
  catchAsync(async (req, res, next) => {
      const item = await createItem(req);
      if(!item) {
        return next(new AppError("There was a problem adding the information to the database.", 500));
      }
      res.status(201).send(item);
  })
);

// GETS A SINGLE ITEM FROM THE DATABASE
router.get("/:id", catchAsync(async (req, res, next) => {
    const item = await getItem(req.params.id);
    if (!item) return next(new AppError('No item found', 404));
    res.status(200).send(item);
}));

// RETURNS ALL THE ITEMS IN THE DATABASE
router.get("/", catchAsync(async (req, res, next) => {
    const items = await getItem();
    if (!items) return next(new AppError('No items found', 404));
    res.status(200).send(items);
}));

router.delete("/:id", VerifyToken, catchAsync(async (req, res, next) => {
    const item = await deleteItem(req.params.id);
    if(!item) return next(new AppError("There was a problem deleting the item.", 404))
    res.status(204).send(`Item: ${item.name} was deleted`); // changed to template literal and corrected a typo
}));

// UPDATES A SINGLE ITEM IN THE DATABASE
router.put("/:id", VerifyToken, catchAsync(async (req, res) => {
  var conditions = { _id: req.params.id, owner: req.userId };
    const updateItem = await updateItem(conditions);
    if(!updateItem) return next(new AppError('No item with this ID found', 404));
    res.status(200).send(item);
}));

export default router;
