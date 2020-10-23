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
  async (req, res) => {
    try {
      const item = await createItem(req);
      res.status(201).send(item);
    } catch (err) {
      return res
        .status(500)
        .send("There was a problem adding the information to the database.");
    }
  }
);

// GETS A SINGLE ITEM FROM THE DATABASE
router.get("/:id", async (req, res) => {
  try {
    const item = await getItem(req.params.id);
    if (!item) return res.status(404).send("No item found.");
    res.status(200).send(item);
  } catch (err) {
    console.log(err);
    return res.status(500).send("There was a problem finding the item.");
  }
});

// RETURNS ALL THE ITEMS IN THE DATABASE
router.get("/", async (req, res) => {
  try {
    const items = await getItem();
    if (!items) return res.status(404).send("No items found.");
    res.status(200).send(items);
  } catch (err) {
    console.log(err);
    return res.status(500).send("There was a problem finding the items.");
  }
});

router.delete("/:id", VerifyToken, async (req, res) => {
  try {
    await deleteItem(req.params.id);
    return res.status(200).send("Iteme: " + item.name + " was deleted.");
  } catch (err) {
    return res.status(500).send("There was a problem deleting the item.");
  }
});

// UPDATES A SINGLE ITEM IN THE DATABASE
router.put("/:id", VerifyToken, async (req, res) => {
  var conditions = { _id: req.params.id, owner: req.userId };
  try {
    await updateItem(conditions);
    res.status(200).send(item);
  } catch (err) {
    return res.status(500).send("There was a problem updating the item.");
  }
});

export default router;
