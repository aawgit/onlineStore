module.exports = {
  //jwt secret
  secret: process.env.JWT_SECRET,
  //fb app credentials
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  //email credentials
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  //cloudinary credentials
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  //mLab credentials
  mLabURI: process.env.MONGODB_URI,
};
