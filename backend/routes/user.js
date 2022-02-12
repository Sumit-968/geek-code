const express = require("express");
const router = express.Router();


const {
  signup,
  login,
  logout,
  getLoggedInUserDetails,
  updateUserDetails,
  getUserDetailsById,
  saveUnsaveCard,
  getSavedCards,
  googleAuth
} = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/user");

router.route("/user/signup").post(signup);
router.route("/user/login").post(login);
router.route("/user/auth/google").post(googleAuth);
router.route("/user/logout").get(logout);
router.route("/user/id").post(getUserDetailsById);
router.route("/user/").get(isLoggedIn, getLoggedInUserDetails);
router.route("/user/update").post(isLoggedIn, updateUserDetails);
router.route("/user/save/card").post(isLoggedIn, saveUnsaveCard);
router.route("/user/saved/cards").get(isLoggedIn, getSavedCards);

module.exports = router;
