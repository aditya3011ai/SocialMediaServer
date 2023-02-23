const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { error ,success } = require("../utils/responseWrapper.js");

dotenv.config("./.env");

const signUpController = async (req, res) => {
  try {
    const { name,email, password } = req.body;
    if (!name|| !email || !password) {
      return res.send(error(400,"all feilds are required"));
    }
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.send(error(400, "user already exists"));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.send(success(200,"User Created"));
  } catch (e) {
    console.log(error(400, e.message));
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!email || !password) {
      return res.send(error(400,"Email and password are required"));
    }
    if (!user) {
      return res.send(error(400, "user not exists"));
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send(error(400, "password mismatch"));
    }
    const accessToken = genrateWebToken({ _id: user._id });
    const refreshToken = genrateRefreshToken({ _id: user._id });

    res.cookie("jwt",refreshToken,{
      httpOnly: true,
      secure: true,
    })
    res.send(success(200, {accessToken}));
  } catch (error) {
    console.log(error);
  }
};
const logoutController = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    });
    res.send(success(200,"user logged Out"))
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const refreshTokenController = async (req, res) => {
  const cookies = req.cookies;
  if(!cookies.jwt){
    return res.send(error(400, "refesh token is required in cookie"));
  }

  const refreshToken = cookies.jwt;

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_STRING);

    const _id = decoded._id;
    const accessToken = genrateWebToken({ _id });
    req._id = decoded._id;
    return res.send(success(201, { accessToken }));
  } catch (e) { 
    console.log(e);
    return res.send(error(400, "invaild refresh token"));
  }
};

const genrateWebToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_STRING, {
      expiresIn: "15m",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};
const genrateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_STRING, {
      expiresIn: "1y",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signUpController,
  loginController,
  refreshTokenController,
  logoutController
};
