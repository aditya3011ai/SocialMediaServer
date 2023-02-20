const Post = require("../models/Post");
const User = require("../models/User");
const { success,error } = require("../utils/responseWrapper");


const getAllPostsController = (req, res) => {
  return res.send(success(201, "these are posts"));
};

const createPostController = async(req, res) => {  
    try {
        const {title} = req.body;
        const owner = req._id;
        if(owner){
        const user = await User.findById(owner)
        const post = await Post.create({
            owner,
            title
        })
       user.posts.push(post._id);
       await user.save();
        return res.send(success(201,post))
    }else{
        return res.send(error(401,"no owner"))
    }
    } catch (e) {
       return res.send(error(500,e.message))
    }
}
const likeAndDislikepost = async (req, res) => {
    try {
        const {postId} = req.body;
    const currentUserId = req._id;
    const post = await Post.findById(postId);
    if(!post) {
        return res.send(error(404,"Post not found"))
    }
    if(post.likes.includes(currentUserId)){
        const index = post.likes.indexOf(currentUserId);
        post.likes.splice(index, 1);

        await post.save();
        return res.send(success(200,"Post Unliked"))
    }else{
        post.likes.push(currentUserId);
        await post.save();
        return res.send(success(200,"Post Liked"))
    }
    } catch (e) {
        return res.send(error(500,e.message))
    }
    

}
module.exports = { getAllPostsController ,createPostController,likeAndDislikepost};

