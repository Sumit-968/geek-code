const Card = require("../models/card");
const User = require("../models/user")
const BigPromise = require("../middlewares/bigPromise");
const user = require("../models/user");


exports.createCard = BigPromise(async (req, res, next) => {
  const { title, description, code, category,cardType } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(401).json({
      error: "Authentication fails",
      status: res.statusCode
    });
  }
  

  if (!title || !description || !code || !category || !cardType) {
    return res.status(400).json({
      error: "Please fill out all fileds",
      status: res.statusCode
    });
  }

  const card = await Card.create({
    title,
    description,
    code,
    category,
    cardType,
    author: req.user._id,
    authorName: user.name,
  });

  await user.authorCards.push(card.id)
  res.status(200).json({
    success: true,
    card,
  });
});

exports.getOneCard = BigPromise(async (req, res, next) => {
  const card = await Card.findById(req.params.id)

  if (!card) {
    return res.status(401).json({
      error: "please check card id",
      status: res.statusCode
    });
  }

  res.status(200).json({
    success: true,
    card,
  });
});

exports.getAllUserCard = BigPromise(async (req, res, next) => {
  const cards = await Card.find({author: req.user.id})

  if (!cards) {
    return res.status(401).json({
      error: "No cards to show",
      status: res.statusCode
    });
  }

  res.status(200).json({
    success: true,
    cards,
  });
});

exports.getAllCards = BigPromise(async (req, res, next) => {
  const cards = await Card.find({})

  if (!cards) {
    return res.status(401).json({
      error: "No cards to show",
      status: res.statusCode
    });
  }

  res.status(200).json({
    success: true,
    cards,
  });
});

exports.updateOneCard = BigPromise(async (req, res, next) => {
  let card = await Card.findById(req.params.id);
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(401).json({
      error: "Login to edit/delete card",
      status: res.statusCode
    });
  }

  if (!card) {
    return res.status(401).json({
      error: "No card found with this id",
      status: res.statusCode
    });
  }

  if(card.author != user.id){
    return res.status(401).json({
      error: "You have no access to this card",
      status: res.statusCode
    });
  }

  card = await Card.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    card,
  });
});

exports.likeCard = BigPromise(async(req, res, next) => {
  const { id } = req.body;
  let card = await Card.findById(id);
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(401).json({
      error: "Login to like card",
      status: res.statusCode
    });
  }

  if (!card) {
    return res.status(401).json({
      error: "No card found with this id",
      status: res.statusCode
    });
  }

  const index = card.likes.findIndex((id) => id === String(req.user.id));

    if (index === -1) {
      card.likes.push(req.user.id); 
    } else {
      card.likes = card.likes.filter((id) => id !== String(req.user.id));
    }

    const updatedCard = await Card.findByIdAndUpdate(id, card, { new: true });

    res.status(200).json(updatedCard);
})
 

exports.deleteCard = BigPromise(async (req, res, next) => {
  const {id} = req.body
  const card = await Card.findById(id);
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(401).json({
      error: "Login to edit/delete card",
      status: res.statusCode
    });
  }

  if (!card) {
    return res.status(401).json({
      error: "No card found with this id",
      status: res.statusCode
    });
  }

  if(card.author != user.id){
    return res.status(401).json({
      error: "You have no access to this card",
      status: res.statusCode
    });
  }
  await card.remove();

  res.status(200).json({
    success: true,
  });
}); 


