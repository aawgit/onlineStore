// CRUD Operations for items
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var multer = require("multer");
var cloudinary = require("cloudinary");
var cloudinaryStorage = require("multer-storage-cloudinary");
var config = require("../config/config");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Item = require("../models/Item");
var VerifyToken = require("../_helper/VerifyToken");

//image uploading with cloudinary
cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret
});

const cloudStorage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "shopApp",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 400, height: 400, crop: "limit" }]
});
const cloudImageUpload = multer({ storage: cloudStorage });

/* router.post("/image", cloudImageUpload.single("file"), function(req, res) {
  console.log(req.file)
}); */

router.delete("/image", function(req, res) {
  const publicId =  'demo/jt1y0p5ezv2mtcpj79ic';
  cloudinary.uploader.destroy(publicId, function(result) { console.log(result) });
  
});



//Image upload config
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/images");
    console.log(file);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage });
/* router.post("/upload-image", upload.single("file"), function(req, res) {
  res.status("201").send("Uploaded");
}); */

// CREATES A NEW ITEM
router.post("/", VerifyToken, cloudImageUpload.single("file"), function(req, res) {
  Item.create(
    {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      owner: req.userId,
      imageLocation: req.file.secure_url
    },
    function(err, item) {
      if (err)
        return res
          .status(500)
          .send("There was a problem adding the information to the database.");
      res.status(201).send(item);
    }
  );
});

// GETS A SINGLE ITEM FROM THE DATABASE
router.get("/:id", function(req, res) {
  Item.findById(req.params.id)
    .populate({ path: "owner", select: "name" })
    .exec(function(err, item) {
      if (err)
        return res.status(500).send("There was a problem finding the item.");
      if (!item) return res.status(404).send("No user found.");
      res.status(200).send(item);
    });
});

// RETURNS ALL THE ITEMS IN THE DATABASE
router.get("/", function(req, res) {
  Item.find({})
    .populate({ path: "owner", select: "name" })
    .exec(function(err, items) {
      if (err)
        return res.status(500).send("There was a problem finding the items.");
      res.status(200).send(items);
    });
});

// DELETES AN ITEM FROM THE DATABASE
router.delete("/:id", VerifyToken, function(req, res) {
  console.log(req.params.id);
  Item.findByIdAndRemove(req.params.id, function(err, item) {
    if (err)
      return res.status(500).send("There was a problem deleting the item.");
    if (item)
      return res.status(200).send("Iteme: " + item.name + " was deleted.");
  });
});

// UPDATES A SINGLE ITEM IN THE DATABASE
router.put("/:id", VerifyToken, function(req, res) {
  var conditions = { _id: req.params.id, owner: req.userId };
  Item.findOneAndUpdate(conditions, req.body, { new: true }, function(
    err,
    item
  ) {
    if (err) {
      console.log("Error ", err);
      return res.status(500).send("There was a problem updating the item.");
    }

    res.status(200).send(item);
    console.log("Updated item ", item);
  });
});

module.exports = router;
