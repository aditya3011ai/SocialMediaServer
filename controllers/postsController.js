const {success} = require('../utils/responseWrapper');
const getAllPostsController = (req,res) =>{
    return res.send(success(201,"these are posts"))
}
module.exports = {getAllPostsController}