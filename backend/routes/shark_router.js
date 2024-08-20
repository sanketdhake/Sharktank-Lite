const express = require("express");
const shark_Router = express.Router();
const shark_controller = require("../controllers/shark_controller");
const isAuthenticated = require("../middlewares/isAuth");
const upload = require("../middlewares/uploadMiddleware");

//Routes
shark_Router.post(
  "/api/v1/shark/register",
  async (req, res, next) => {
    req.folderName = "Sharks_Business_Proof";
    req.resource_type = "raw";
    req.format = "zip";
    next();
  },
  upload.single("file"),
  shark_controller.register
);
shark_Router.post("/api/v1/shark/login", shark_controller.login);
shark_Router.post(
  "/api/v1/shark/update",
  isAuthenticated,
  async (req, res, next) => {
    req.folderName = "Sharks_Business_Proof";
    req.resource_type = "raw";
    req.format = "zip";
    next();
  },
  upload.single("file"),
  shark_controller.update
);
shark_Router.delete(
  "/api/v1/shark/delete",
  isAuthenticated,
  shark_controller.delete
);
shark_Router.get("/api/v1/shark/list", shark_controller.list);
module.exports = shark_Router;
