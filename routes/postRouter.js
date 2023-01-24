const routes = require("express").Router();
const requireUser = require('../middleware/requireUser')
const {getAllPostsController} = require("../controllers/postsController");

routes.get("/all",requireUser, getAllPostsController);

module.exports = routes;
