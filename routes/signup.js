var express = require("express");
var router = express.Router();

module.exports = function(passport) {
  router.post("/", function(req, res, next) {
    passport.authenticate("local-signup", function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send({ user: false, message: info.message });
      }
      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.send({ user: req.user, message: info.message });
      });
    })(req, res, next);
  });

  return router;
};
