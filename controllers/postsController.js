const Post = require("../models/Post");
const User = require("../models/User");
const { success, error } = require("../utils/responseWrapper");
const cloudinary = require("cloudinary").v2;
const mapPostOutput = require('../utils/Utils')

const createPostController = async (req, res) => {
  try {
      const { title, postImg } = req.body;

      if(!title || !postImg) {
          return res.send(error(400, 'Caption and postImg are required'))
      }
      const cloudImg = await cloudinary.uploader.upload(postImg, {
          folder: 'postImg'
      })

      const owner = req._id;

      const user = await User.findById(req._id);

      const post = await Post.create({
          owner,
          title,
          image: {
              publicId: cloudImg.public_id,
              url: cloudImg.url
          },
      });

      user.posts.push(post._id);
      await user.save();
      return res.json(success(200, { post }));
  } catch (e) {
      return res.send(error(500, e.message));
  }
};
const likeAndDislikepost = async (req, res) => {
  try {
      const { postId } = req.body;
      const curUserId = req._id;

      const post = await Post.findById(postId).populate('owner');
      if (!post) {
          return res.send(error(404, "Post not found"));
      }

      if (post.likes.includes(curUserId)) {
          const index = post.likes.indexOf(curUserId);
          post.likes.splice(index, 1);
      } else {
          post.likes.push(curUserId);
      }
      await post.save();
      return res.send(success(200, {post: mapPostOutput(post, req._id)}));

  } catch (e) {
      return res.send(error(500, e.message));
  }
};
const updatePost = async (req, res) => {
  try {
    const userId = req._id;
    const { postId, title } = req.body;
    if (!title) {
      return res.send(error(400, "Title is required"));
    }
    const post = await Post.findById(postId);
    if (!post || !postId) {
      return res.send(error(404, "Post not found"));
    }
    if (post.owner.toString() !== userId) {
      return res.send(error(403, "You are Not the Owmer of this post"));
    }
    if (title) {
      post.title = title;
    }
    await post.save();
    return res.send(success(200, post));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const deletePost = async (req, res) => {
  try {
    const userId = req._id;
    const { postId } = req.body;
    const post = await Post.findById(postId);
    const user = await User.findById(userId);
    if (!post || !postId) {
      return res.send(error(404, "Post not found"));
    }
    if (post.owner.toString() !== userId) {
      return res.send(error(403, "You are Not the Owmer of this post"));
    }
    const index = user.posts.indexOf(postId);
    user.posts.splice(index, 1);
    await user.save();
    await post.remove();
    return res.send(success(200, "Post deleted successfully"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  createPostController,
  likeAndDislikepost,
  updatePost,
  deletePost,
};
