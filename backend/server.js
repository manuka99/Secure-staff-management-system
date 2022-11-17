const https = require("https");
const fs = require("fs");
const path = require("path");
const { connect } = require("./Startups/Database");
const app = require("./app");
require("dotenv").config();

const startApp = async () => {
  try {
    // connect with db
    await connect();
    console.log("Connected to database");

    if (process.env.NODE_ENV === "production") {
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
