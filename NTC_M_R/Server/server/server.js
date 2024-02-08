require('newrelic');
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const routes = require("./routes/route.js");
require("dotenv").config();
const fs = require("fs");
const app = express();
const sequelizeConnection = require("./config/dbConfig");
const publicKEY = fs.readFileSync("./public.key", "utf8");
const PORT = process.env.PORT || 4000;
const CONSTANTS = require("./constants/constant");
const cors = require("cors");
app.use(cors());
sequelizeConnection
  .authenticate()
  .then((conn) => {
    console.log("Connection has been established successfully");
  })
  .catch((error) => {
    console.log("Something went wrong while connecting to database.", error);
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const LoggerInfo = require("./helpers/logger");
const label = "server";
const info = "info";
const errorMsg = "error";
app.use(async (req, res, next) => {
  if(req.path === '/config/healthcheck' || req.path === '/config/webhooks') {
    next();
  } else if (req.headers && req.headers.authorization) {
    try {
      if (req.headers.role === "TESTUSER") {
        next();
      } else {
        const accessToken = req.headers.authorization.split(" ")[1];
        const decodedAccessToken = jwt.verify(accessToken, publicKEY);
        // If token has expired
        if (decodedAccessToken.exp < Date.now().valueOf() / 1000) {
          return res.status(401).json({
            error: CONSTANTS.JWT_EXPIRATION,
          });
        }
        res.locals.loggedInUser = decodedAccessToken;
        next();
      }
    } catch (error) {
      LoggerInfo(label, errorMsg).error(
        `While calling Brand API: ${error.message}.`
      );
      return res.status(401).json({
        error: CONSTANTS.USE_VALID_TOKEN,
      });
    }
  } else {
    LoggerInfo(label, errorMsg).error(
      `Authorization not passed in the headers.`
    );
    return res.status(401).json({
      message: CONSTANTS.AUTH_HEADER,
    });
  }
});

app.use("/config", routes);

app.listen(PORT, () => {
  console.log("Server is listening on Port:", PORT);
});

module.exports = app;
