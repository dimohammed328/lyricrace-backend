var express = require("express");
var router = express.Router();
var pgp = require("pg-promise")(/*options*/);
var db = pgp(
  process.env.DATABASE_URL ||
    "postgres://postgres:password@127.0.0.1:5432/postgres"
);

/* GET users listing. */
router.get("/", function(req, res) {
  console.log("here");
  db.one("SELECT * from test limit 1;")
    .then(function(data) {
      query = data;
      res.send(query);
    })
    .catch(function(error) {
      console.log("ERROR:", error);
    });
});

module.exports = router;
