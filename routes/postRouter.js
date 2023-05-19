const routes = require("express").Router();
const requireUser = require('../middleware/requireUser')
const {createPostController,likeAndDislikepost, updatePost,deletePost} = require("../controllers/postsController");

routes.post("/",requireUser, createPostController);
routes.post("/like",requireUser, likeAndDislikepost);
routes.put("/",requireUser, updatePost);
routes.post("/delete",requireUser, deletePost);


module.exports = routes;
 