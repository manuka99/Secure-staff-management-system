const express = require("express");
const cors = require("cors");
const path = require("path");
const apiRoutes = require("./routes/route.api");
require("dotenv").config();

// set up express
const app = express();
app.use(express.json());
app.use(cors());

//Set up routes
//API routes
app.use("/api", apiRoutes);

// serve static assests
if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, `public`, `index.html`));
  });
}

module.exports = app;
