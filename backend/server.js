const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const path = require("path");
const apiRoutes = require("./routes/route.api");

require("dotenv").config();

// set up express
const app = express();
app.use(express.json());
app.use(cors());

//Set up mongoose
mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

//Set up routes
//API routes
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 8080;
const HTTP_PORT = process.env.HTTP_PORT || 5080;

const options = {
  key: fs.readFileSync(path.join(__dirname, `cert`, `key.pem`)),
  cert: fs.readFileSync(path.join(__dirname, `cert`, `cert.pem`)),
};

const sslServer = https.createServer(options, app);

sslServer.listen(PORT, () => {
  console.log(`Secure server is listening on port ${PORT}`);
});

app.listen(HTTP_PORT, () => {
  console.log(`HTTP server is listening on port ${HTTP_PORT}`);
});
