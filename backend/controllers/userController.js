const User = require("../models/user");
require("dotenv").config();
const BigPromise = require("../middlewares/bigPromise");
const cookieToken = require("../utils/cookieToken");
const Card = require("../models/card");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.signup = BigPromise(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({
      error: "Name, email and password are required",
      status: res.statusCode,
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  cookieToken(user, res);
});

exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  // check for presence of email and password
  if (!email || !password) {
    return res.status(400).json({
      error: "please provide email and password",
      status: res.statusCode,
    });
  }

  // get user from DB
  const user = await User.findOne({ email }).select("+password");

  // if user not found in DB
  if (!user) {
    return res.status(400).json({
      error: "Email or password does not match or exist",
      status: res.statusCode,
    });
  }

  // match the password
  const isPasswordCorrect = await user.isValidatedPassword(password);

  //if password do not match
  if (!isPasswordCorrect) {
    return res.status(400).json({
      error: "Email or password does not match or exist",
      status: res.statusCode,
    });
  }

  // if all goes good and we send the token
  cookieToken(user, res);
});

exports.googleAuth = BigPromise(async (req, res, next) => {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { name, email, sub } = ticket.getPayload();
  await User.findOne({ email: email }).then((user) => {
    if (user) {
      cookieToken(user, res);
    } else {
      User.create({
        name: name,
        googleId: sub,
        email: email,
      })
        .then((user) => {
          cookieToken(user, res);
        })
        .catch((err) => console.log(err));
    }
  });
});

exports.logout = BigPromise(async (req, res, next) => {
  //clear the cookie
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  //send JSON response for success
  res.status(200).json({
    succes: true,
    message: "Logout success",
  });
});

exports.getLoggedInUserDetails = BigPromise(async (req, res, next) => {
  //req.user will be added by middleware
  // find user by id
  const user = await User.findById(req.user.id);

  //send response and user data
  res.status(200).json({
    success: true,
    user,
  });
});

exports.getUserDetailsById = BigPromise(async (req, res, next) => {
  // find user by id
  const user = await User.findById(req.user.id);

  //send response and user data
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUserDetails = BigPromise(async (req, res, next) => {
  // add a check for email and name in body

  // collect data from body
  const newData = {
    name: req.body.name,
    email: req.body.email,
  };

  // update the data in user
  const user = await User.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.saveUnsaveCard = BigPromise(async (req, res, next) => {
  const { id } = req.body;
  let user = await User.findById(req.user.id);
  let card = await Card.findById(id);

  if (!user) {
    return res.status(401).json({
      error: "Authentication Fails",
      status: res.statusCode,
    });
  }

  const indexUser = user.saves.findIndex((card) => card._id == id);
  const indexCard = card.saves.findIndex((id) => id === String(req.user.id));

  //saveUnsave card in user

  if (indexUser === -1) {
    user.saves.push(card);
  } else {
    user.saves = user.saves.filter((card) => card._id != id);
  }

  //saveUnsave user in card
  if (indexCard === -1) {
    card.saves.push(req.user.id);
  } else {
    card.saves = card.saves.filter((id) => id !== String(req.user.id));
  }

  const updatedCard = await Card.findByIdAndUpdate(id, card, { new: true });

  const updatedUser = await User.findByIdAndUpdate(req.user.id, user, {
    new: true,
  });

  res.status(200).json(updatedCard);
});

exports.getSavedCards = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(401).json({
      error: "Login to access saved cards",
      status: res.statusCode,
    });
  }
  const savedCards = user.saves;
  if (!savedCards) {
    return res.status(401).json({
      error: "No Saved Card Found",
      status: res.statusCode,
    });
  }
  res.status(200).json({
    success: true,
    savedCards,
  });
});
