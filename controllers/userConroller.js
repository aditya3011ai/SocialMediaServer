const { error, success } = require("../utils/responseWrapper");
const User = require("../models/User");
const Post = require("../models/Post");

const followUserandUnfollowUserConroller = async (req, res) => {
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
    console.log(posts);
    return res.send(success(200,posts));
  } catch (e) {
    return res.send(error(500,e.message));
  }
    
    
}
module.exports = { followUserandUnfollowUserConroller,getPostsOfFollowings };
