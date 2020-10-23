import Item from "../models/Item";
export const deleteImage = () => {
  // TODO: Review this
  //   const publicId = "demo/jt1y0p5ezv2mtcpj79ic";
  //   cloudinary.uploader.destroy(publicId, function (result) {
  //     console.log(result);
  //   });
};

export const createItem = async (req) => {
  return await Item.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    owner: req.userId,
    imageLocation: req.file.secure_url,
  });
};

export const getItem = async (id = null) => {
  if (id)
    return await Item.findById(id)
      .populate({ path: "owner", select: "name" })
      .exec();
  else
    return await Item.find({})
      .populate({ path: "owner", select: "name" })
      .exec();
};

export const deleteItem = async (id) => {
  await Item.findByIdAndRemove(id);
};

export const updateItem = async (conditions) => {
  return await Item.findOneAndUpdate(conditions);
};
