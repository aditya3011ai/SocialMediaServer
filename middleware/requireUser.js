const jwt = require("jsonwebtoken");
const { error } = require("../utils/responseWrapper");
module.exports = async (req, res, next) => {
  if (!req.headers?.authorization?.startsWith("Bearer")) {
    return res.send(error(401, "invaild authorization"));
  }
  const authToken = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(authToken, process.env.ACCESS_TOKEN_STRING);
    req._id = decoded._id;
    next();
  } catch  {
    return res.send(error(401, "invaild access token"));
  }
};
