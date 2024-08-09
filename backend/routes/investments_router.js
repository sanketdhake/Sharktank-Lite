const express = require("express");
const investments_Router = express.Router();
const investments_controller = require("../controllers/investments_controller");
const isAuthenticated = require("../middlewares/isAuth");

investments_Router.post(
  "/api/v1/investments/add_investment/:id",
  isAuthenticated,
  investments_controller.add_investment
);
investments_Router.post(
  "/api/v1/investments/accept_investment/:id",
  isAuthenticated,
  investments_controller.accept_investment
);
investments_Router.post(
  "/api/v1/investments/complete_investment/:id",
  isAuthenticated,
  investments_controller.complete_investment
);
module.exports = investments_Router;
