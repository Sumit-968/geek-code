const express = require("express");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');


//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//import all routes here
const user = require("./routes/user");
const card = require("./routes/card");

//router middleware
app.use("/api/v1", user);
app.use("/api/v1", card);

// --------------------------deployment------------------------------
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------


// export app js
module.exports = app;
