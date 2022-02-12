const User = require("../models/user");
const Card = require("../models/card");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = BigPromise(async (req, res, next) => {
  // const token = req.cookies.token || req.header("Authorization").replace("Bearer ", "");

  // check token first in cookies
  let token = req.cookies.token;

  // if token not found in cookies, check if header contains Auth field
  if (!token && req.header("Authorization")) {
    token = req.header("Authorization").replace("Bearer ", "");
  }

  if (!token) {
    return next(new CustomError("Login first to access this page", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
});

exports.cardAdmin = BigPromise(async (req, res, next) => {
  console.log(req.body.id);
  const card = await Card.findById(id);
  if(!card){
    return next(new CustomError("Card not exists", 401));
  }
  if(req.user.id != card.author){
    return next(new CustomError("You're not the admin of this card", 401));
  }
  next();
}); 
