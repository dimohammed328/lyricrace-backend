var express = require("express");
var router = express.Router();
var pgp = require("pg-promise")(/*options*/);
const passport = require("passport");
var { query } = require("../config/database.js");

module.exports = function(passport) {
  router.post("/", passport.authenticate("local"), (req, res) => {
    res.send(req.user);
  });
  return router;
};
