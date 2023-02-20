const routes = require("express").Router();
const requireUser = require('../middleware/requireUser')
const {getAllPostsController,createPostController,likeAndDislikepost} = require("../controllers/postsController");

routes.get("/all",requireUser, getAllPostsController);
routes.post("/",requireUser, createPostController);
routes.post("/like",requireUser, likeAndDislikepost);

module.exports = routes;
 