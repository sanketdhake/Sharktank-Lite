const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const public_id = file.originalname.replace(/\.[^/.]+$/, "");

    return {
      folder: req.folderName || "default_folder",
      resource_type: "raw", // For non-image files like zip
      format: "zip",
      public_id,
    };
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
