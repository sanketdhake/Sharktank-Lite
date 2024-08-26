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

    // Default to the first file's details provided in the request
    let folder = req.folderName || "default_folder";
    let resource_type = req.resource_type || "raw"; // Default to "raw" assuming it's a zip
    let format = req.format || "zip";

    // If the second file is provided, override with its details
    if (file.fieldname === "file2") {
      folder = req.folderName2 || folder;
      resource_type = req.resource_type2 || resource_type;
      format = req.format2 || format;
    }

    return {
      folder: folder,
      resource_type: resource_type,
      format: format,
      public_id,
    };
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "file", maxCount: 1 }, // Required: zip or image
  { name: "file2", maxCount: 1 }, // Optional: second file, zip or image
]);

module.exports = upload;
