var express = require("express");
var router = express.Router();
var pgp = require("pg-promise")(/*options*/);
const passport = require("passport");
var { query } = require("../config/database.js");

module.exports = function() {
  router.get("/", (req, res, next) => {
    query("SELECT title,artist FROM songs", [], (err, result) => {
      if (err) {
        console.log("Error", err);
        return next(err);
      } else {
        res.send(result);
      }
    });
  });
  return router;
};
