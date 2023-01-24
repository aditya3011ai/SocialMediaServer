const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect')
const authRouter = require('./routes/authRouter')
const postRouter = require('./routes/postRouter')
const cookieParser = require('cookie-parser')

const app = express();
dotenv.config('./.env');

app.use(express.json());
app.use(cookieParser());
app.use('/auth',authRouter)
app.use('/posts',postRouter)
app.get('/', (req,res)=>{
    res.send("hlo")
})

dbConnect();

const PORT = process.env.PORT || 4001;

app.listen(PORT, ()=>{
    console.log("lising app listening on port ", PORT);
});