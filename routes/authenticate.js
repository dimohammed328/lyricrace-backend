var express = require("express");
var router = express.Router();

module.exports = function(passport) {
  router.post("/", (req, res) => {
    if (req.auth) {
      req.session.destroy();
      res.send({ id: req.user });
    } else {
      req.session.destroy();
      res.send(false);
    }
  });

  return router;
};
