const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    image:{
        publicId:mongoose.Schema.Types.ObjectId,
        url:String
    },
    title:{
        type:String,
        required:true
    },
    likes:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
    ]
})

module.exports = mongoose.model('post',postSchema)