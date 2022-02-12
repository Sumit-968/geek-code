
const express = require("express");
const {
    createCard,
    getOneCard,
    getAllCards,
    updateOneCard,
    likeCard,
    deleteCard,
    getAllUserCard
} = require("../controllers/cardController");
const router = express.Router();
const { isLoggedIn, cardAdmin } = require("../middlewares/user");

router.route("/card/").get(getAllCards);
router.route("/card/create").post(isLoggedIn, createCard);
router.route("/card/:id").get(isLoggedIn, getOneCard);
router.route("/card/user/all").get(isLoggedIn, getAllUserCard);
router.route("/card/update/:id").put(isLoggedIn, updateOneCard);
router.route("/card/like").post(isLoggedIn, likeCard);
router.route("/card/delete").delete(isLoggedIn,deleteCard);

module.exports = router;  
