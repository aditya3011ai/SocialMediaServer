const routes = require('express').Router();
const { followUserandUnfollowUserConroller,getPostsOfFollowings } = require('../controllers/userConroller');
const RequireUser =  require('../middleware/requireUser')

routes.post('/follow',RequireUser, followUserandUnfollowUserConroller)
routes.get('/postsOfFollowing',RequireUser, getPostsOfFollowings)


module.exports = routes;