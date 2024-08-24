const express = require("express");
const business_Router = express.Router();
const business_controller = require("../controllers/business_controller");
const upload = require("../middlewares/uploadMiddleware");
const isAuthenticated = require("../middlewares/isAuth");

business_Router.post(
  "/api/v1/business/register",
  async (req, res, next) => {
    req.folderName = "Business_Image";
    req.resource_type = "image";
    req.format = "jpeg";
    next();
  },
  upload.single("file"),
  isAuthenticated,
  business_controller.register
);
business_Router.post(
  "/api/v1/business/update/:id",
  isAuthenticated,
  async (req, res, next) => {
    req.folderName = "Business_Image";
    req.resource_type = "image";
    req.format = "jpeg";
    next();
  },
  upload.single("file"),
  business_controller.update
);
business_Router.delete(
  "/api/v1/business/delete",
  isAuthenticated,
  business_controller.delete
);
business_Router.get(
  "/api/v1/business/list_verified",
  business_controller.list_verified
);
business_Router.get(
  "/api/v1/business/list_not_verified",
  business_controller.list_not_verified
);
business_Router.get(
  "/api/v1/business/get_equity/:id",
  isAuthenticated,
  business_controller.get_equity
);

module.exports = business_Router;
