const routes = require('express').Router();
const { followUserandUnfollowUser,getPostsOfFollowings,getMyPosts, getUserPosts,deleteUser } = require('../controllers/userConroller');
const RequireUser =  require('../middleware/requireUser')

routes.post('/follow',RequireUser, followUserandUnfollowUser)
routes.get('/postsOfFollowing',RequireUser, getPostsOfFollowings)
routes.get('/myPosts',RequireUser, getMyPosts)
routes.get('/userPosts',RequireUser, getUserPosts);
routes.delete('/deleteUser',RequireUser, deleteUser);


module.exports = routes;