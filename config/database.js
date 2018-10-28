var pg = require("pg");
pg.defaults.ssl = true;
var configDB = {
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://ihgrdjvnzclpzu:5fc0c1a93fc4142eded83071a15902f9ca7e361cb6d386b03a54daf963d7a8a9@ec2-107-22-189-136.compute-1.amazonaws.com:5432/d7theiderkahqo"
};
const pool = new pg.Pool(configDB);
pool.on("error", function(err) {
  console.log(err);
});

module.exports = function query(text, params, callback) {
  console.log(text, params, callback);
  return pool.query(text, params, callback);
};
