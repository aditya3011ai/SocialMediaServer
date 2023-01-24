const routes = require("express").Router();

const {
  signUpController,
  loginController,
  refreshTokenController,
} = require("../controllers/authController");

routes.post("/signup", signUpController);
routes.post("/login", loginController);
routes.post("/refresh", refreshTokenController);

module.exports = routes;
