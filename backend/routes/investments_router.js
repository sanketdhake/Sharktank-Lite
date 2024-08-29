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
investments_Router.post(
  "/api/v1/investments/reject_investment/:id",
  isAuthenticated,
  investments_controller.reject_investment
);
investments_Router.get(
  "/api/v1/investments/list_newInvestment/:id",
  investments_controller.list_newInvestment
);
investments_Router.get(
  "/api/v1/investments/list_acceptedInvestment/:id",
  investments_controller.list_acceptedInvestment
);
investments_Router.get(
  "/api/v1/investments/list_rejectedInvestment/:id",
  investments_controller.list_rejectedInvestment
);
investments_Router.get(
  "/api/v1/investments/list_completedInvestment/:id",
  investments_controller.list_completedInvestment
);
investments_Router.get(
  "/api/v1/investments/list_sharksInvestment/:id",
  isAuthenticated,
  investments_controller.list_sharksInvestments
);

module.exports = investments_Router;
