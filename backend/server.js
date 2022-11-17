const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const path = require("path");
const apiRoutes = require("./routes/route.api");
const { connect } = require("./Startups/Database");
require("dotenv").config();

const startApp = async () => {
  try {
    // connect with db
    await connect();
    console.log("Connected to database");

    // set up express
    const app = express();
    app.use(express.json());
    app.use(cors());

    //Set up mongoose
    await connect();

    //Set up routes
    //API routes
    app.use("/api", apiRoutes);

    // serve static assests
    if (process.env.NODE_ENV === "production") {
      app.use(express.static("public"));
      app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, `public`, `index.html`));
      });

      // start HTTPS server
      const PORT = process.env.PORT || 8080;

      const options = {
        key: fs.readFileSync(path.join(__dirname, `cert`, `key.pem`)),
        cert: fs.readFileSync(path.join(__dirname, `cert`, `cert.pem`)),
      };

      const sslServer = https.createServer(options, app);

      sslServer.listen(PORT, () => {
        console.log(`Secure server is listening on port ${PORT}`);
      });
    } else {
      // start HTTP server
      const HTTP_PORT = process.env.HTTP_PORT || 5000;
      app.listen(HTTP_PORT, () => {
        console.log(`HTTP server is listening on port ${HTTP_PORT}`);
      });
    }
  } catch (error) {
    console.error("Database connectivity failed", error.message);
    startApp();
  }
};

// start the app
startApp();
