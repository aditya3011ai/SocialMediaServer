const routes = require('express').Router();
const { followUserandUnfollowUser,getPostsOfFollowings,getMyPosts, getUserPosts,deleteUser,getMyInfo ,updateUserProfile,getUserProfile} = require('../controllers/userConroller');
const requireUser =  require('../middleware/requireUser')

routes.post('/follow',requireUser, followUserandUnfollowUser)
routes.get('/postsOfFollowing',requireUser, getPostsOfFollowings)
routes.get('/getFeedData', requireUser, getPostsOfFollowings);
routes.get('/myPosts',requireUser, getMyPosts)
routes.get('/userPosts',requireUser, getUserPosts);
routes.delete('/deleteUser',requireUser, deleteUser);
routes.get('/getMyInfo',requireUser,getMyInfo);
routes.put('/',requireUser,updateUserProfile);
routes.post('/getUserProfile',requireUser,getUserProfile);


module.exports = routes;