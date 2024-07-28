const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const isAuthenticated = (req, res, next) => {
  const token = req.headers["authorization"];
  //console.log(token);
  const verifytoken = jwt.verify(
    token,
    process.env.JWT,
    async (error, decoded) => {
      req.user = decoded.id;
      if (error) {
        return false;
      }
    }
  );
  if (!verifytoken) {
    const error = new Error("Token is expired, login again");
    next(error);
  }
  next();
};
module.exports = isAuthenticated;
