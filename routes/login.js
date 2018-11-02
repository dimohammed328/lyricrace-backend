var express = require("express");
var router = express.Router();
var pgp = require("pg-promise")(/*options*/);
const passport = require("passport");
var { query } = require("../config/database.js");

module.exports = function(passport) {
<<<<<<< HEAD
  router.post("/", function(req, res, next) {
    passport.authenticate("local-login", function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send({
          user: false,
          message: info.message,
          session: req.session
        });
      }
      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.send({
          user: req.user,
          message: info.message,
          session: req.session
        });
      });
    })(req, res, next);
=======
  router.post("/", passport.authenticate("local"), (req, res) => {
    res.send("it, works");
>>>>>>> parent of d309126... authorization successful
  });
  return router;
};
