const express = require("express");
const admin_Router = express.Router();
const admin_controller = require("../controllers/admin_controller");
const isAuthenticated = require("../middlewares/isAuth");

admin_Router.post("/api/v1/admin/register", admin_controller.register);
admin_Router.post("/api/v1/admin/login", admin_controller.login);
admin_Router.delete("/api/v1/admin/delete", admin_controller.delete);
admin_Router.post(
  "/api/v1/admin/approve-entrepreneur/:id",
  admin_controller.approve_entrepreneur
);
admin_Router.post(
  "/api/v1/admin/approve-shark/:id",
  admin_controller.approve_shark
);
admin_Router.post(
  "/api/v1/admin/approve-business/:id",
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

module.exports = admin_Router;
