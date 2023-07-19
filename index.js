const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect')
const authRouter = require('./routes/authRouter')
const postRouter = require('./routes/postRouter')
const userRouter = require('./routes/userRouter')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const app = express();
dotenv.config('./.env');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_API_KEY
});
app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:process.env.BASE_URL,   
}))

app.use('/auth',authRouter)
app.use('/posts',postRouter)
app.use('/user',userRouter)

app.get('/', (req,res)=>{
    res.send("Ok")
})

dbConnect();

const PORT = process.env.PORT || 4001;

app.listen(PORT, ()=>{
    console.log("lising app listening on port ", PORT);
});