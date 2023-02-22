const routes = require("express").Router();
const requireUser = require('../middleware/requireUser')
const {createPostController,likeAndDislikepost, updatePost} = require("../controllers/postsController");

routes.post("/",requireUser, createPostController);
routes.post("/like",requireUser, likeAndDislikepost);
routes.put("/",requireUser, updatePost);


module.exports = routes;
 