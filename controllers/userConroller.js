const { error, success } = require("../utils/responseWrapper");
const User = require("../models/User");
const Post = require("../models/Post");

const followUserandUnfollowUser = async (req, res) => {
  try {
    const { userIdtoFollow } = req.body;
    const currentUserId = req._id;
    const currentUser = await User.findById(currentUserId);
    const usertoFollow = await User.findById(userIdtoFollow)

    if (currentUserId === userIdtoFollow) {
      return res.send(error(409, "Users cannot follow yourtselves"));
    }
    if (!usertoFollow) {
      return res.send(error(404, "User not found"));
    }
    if (currentUser.followings.includes(userIdtoFollow)) {
        
      const followingIndex = currentUser.followings.indexOf(userIdtoFollow);
      currentUser.followings.splice(followingIndex, 1);

      const followerIndex = currentUser.followers.indexOf(currentUserId);
      usertoFollow.followers.splice(followerIndex, 1);

      await currentUser.save();
      await usertoFollow.save();
      return res.send(success(200, "User Unfollowed"));
    } else {
      currentUser.followings.push(userIdtoFollow);
      usertoFollow.followers.push(currentUserId);

      await currentUser.save();
      await usertoFollow.save();

      return res.send(success(200, "User followed"));
    }
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const getPostsOfFollowings = async(req,res)=>{

  try {
    const currentUserId = req._id;

    const currentUser = await User.findById(currentUserId);

    const posts = await Post.find({
      owner:{
        $in:currentUser.followings
      }
    })
    return res.send(success(200,posts));
  } catch (e) {
    return res.send(error(500,e.message));
  }
    
    
}
const getMyPosts = async(req,res)=>{
  try {
    const userId = req._id;
    const user = await User.findById(userId);
    if(!user){
      return res.send(error(404,"User not found"));
    }
    const postsId = user.posts;
    if(!postsId){
      return res.send(error(404,"No Posts found"))
    }
    const posts = await Post.find({
      _id:{
        $in:postsId,
      }
    }).populate('likes')
    return res.send(success(200,posts));
  } catch (e) {
    return res.send(error(500,e.message));
  }
   

}
const getUserPosts = async(req,res)=>{
  try {
    const {userIdToFind} = req.body;
    const user = await User.findById(userIdToFind);
    if(!user){
      return res.send(error(404,"User not found"));
    }
    const postsId = user.posts;
    if(!postsId){
      return res.send(error(404,"No Posts found"))
    }
    const posts = await Post.find({
      _id:{
        $in:postsId,
      }
    })
    return res.send(success(200,posts));
  } catch (e) {
    return res.send(error(500,e.message));
  }
}
const deleteUser = async(req, res) => {
  try {
    const userId = req._id;
    const user = await User.findById(userId);
    await Post.deleteMany({
      owner:userId
    })
    user.followers.forEach(async(follwersId)=>{
      const follower = await User.findById(follwersId); 
      const index = follower.followings .indexOf(userId);
      if(index){
      follower.followings.splice(index, 1);
      await follower.save();
      }
    })
    user.followings.forEach(async(followingId)=>{
      const followingUser = await User.findById(followingId);
      const index = followingUser.followers.indexOf(userId);
      if(index){
      followingUser.followers.splice(index, 1);
      await followingUser.save();}
    })
    const allPosts = await Post.find();
    allPosts.forEach(async(post) =>{
      const index = post.likes.indexOf(userId);
      if(index){
        post.likes.splice(index,1);
      }
      await post.save();
    })
    await user.remove();
    res.clearCookie('jwt',{
      httpOnly:true,
      secure:true
    })
    return res.send(success(200,"User deleted successfully"))
  } catch (e) {
    return res.send(error(500,e.message))
  }
}
module.exports = { followUserandUnfollowUser,getPostsOfFollowings,getMyPosts,getUserPosts,deleteUser };
