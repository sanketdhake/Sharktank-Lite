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
  "/api/v1/entrepreneur/list",
  entrepreneur_controller.list
);

module.exports = entrepreneur_Router;
