const express = require("express");
const entrepreneur_Router = express.Router();
const entrepreneur_controller = require("../controllers/entrepreneur_controller");
const isAuthenticated = require("../middlewares/isAuth");

entrepreneur_Router.post(
  "/api/v1/entrepreneur/register",
  entrepreneur_controller.register
);
entrepreneur_Router.post(
  "/api/v1/entrepreneur/login",
  entrepreneur_controller.login
);
entrepreneur_Router.post(
  "/api/v1/entrepreneur/update",
  isAuthenticated,
  entrepreneur_controller.update
);
entrepreneur_Router.delete(
  "/api/v1/entrepreneur/delete",
  isAuthenticated,
  entrepreneur_controller.delete
);
entrepreneur_Router.get(
  "/api/v1/entrepreneur/list_unverified",
  isAuthenticated,
  entrepreneur_controller.list_unverified
);
entrepreneur_Router.get(
  "/api/v1/entrepreneur/list_verified",
  isAuthenticated,
  entrepreneur_controller.list_verified
);
entrepreneur_Router.get(
  "/api/v1/entrepreneur/profile",
  isAuthenticated,
  entrepreneur_controller.profile
);
entrepreneur_Router.get(
  "/api/v1/entrepreneur/list_business",
  isAuthenticated,
  entrepreneur_controller.list_business
);

module.exports = entrepreneur_Router;
