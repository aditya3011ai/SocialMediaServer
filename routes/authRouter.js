const routes = require("express").Router();

const {
  signUpController,
  loginController,
  refreshTokenController,
  logoutController,
} = require("../controllers/authController");

routes.post("/signup", signUpController);
routes.post("/login", loginController);
routes.get("/refresh", refreshTokenController);
routes.post("/logout", logoutController);

module.exports = routes;
