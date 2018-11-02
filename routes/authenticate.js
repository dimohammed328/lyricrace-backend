var express = require("express");
var router = express.Router();

module.exports = function(passport) {
  router.get("/", function(req, res, next) {
    console.log(req);
    if (req.isAuthenticated()) {
      res.send({ authenticated: true });
    } else {
      res.send({ authenticated: false });
    }
  });

  return router;
};
