const mongoose = require("mongoose");
 
const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a unique title"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a short description"],
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  authorName:{
    type: String,
    default: "Author Name",
  },
  code: {
    type: String,
    required: [true, "Please provide a short-cut/command"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: [String], 
    default: [],
  },
  saves: {
    type: [String], 
    default: [],
  },
  cardType: {
    type: String,
    required: [
      true,
      "please select type from- shortcut and command",
    ],
    enum: {
      values: ["shortcut", "command"],
      message:
        "please select type ONLY from - shortcut and command ",
    },
  },
  category: {
    type: String,
    required: [
      true,
      "please select category from given categories",
    ],
    enum: {
      values: ["VsCode", "GitHub", "ReactJs", "MsWord", "MsExcel", "AdobePhotoshop", "Figma", "AdobeIllustrator", "Basic Keyboard", "Linux", "CommandPrompt", "Ubuntu", "NodeJs", "NodePackageManager", "Other"],
      message:
        "please select category ONLY from given categories",
    },
  }
});

module.exports = mongoose.model("Card", cardSchema);