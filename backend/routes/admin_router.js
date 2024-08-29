const express = require("express");
const admin_Router = express.Router();
const admin_controller = require("../controllers/admin_controller");
const isAuthenticated = require("../middlewares/isAuth");

admin_Router.post("/api/v1/admin/register", admin_controller.register);
admin_Router.post("/api/v1/admin/login", admin_controller.login);
admin_Router.delete("/api/v1/admin/delete", admin_controller.delete);
admin_Router.post(
  "/api/v1/admin/approve-entrepreneur/:id",
  isAuthenticated,
  admin_controller.approve_entrepreneur
);
admin_Router.post(
  "/api/v1/admin/approve-shark/:id",
  isAuthenticated,
  admin_controller.approve_shark
);
admin_Router.post(
  "/api/v1/admin/approve-business/:id",
  isAuthenticated,
  admin_controller.approve_business
);
admin_Router.post(
  "/api/v1/admin/entrepreneur_support",
  isAuthenticated,
  admin_controller.entrepreneur_support
);
admin_Router.post(
  "/api/v1/admin/shark_support",
  isAuthenticated,
  admin_controller.shark_support
);
admin_Router.get(
  "/api/v1/admin/profile",
  isAuthenticated,
  admin_controller.profile
);

module.exports = admin_Router;
