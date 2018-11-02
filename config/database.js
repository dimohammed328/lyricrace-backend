var { Pool } = require("pg");
var configDB = {
  connectionString: process.env.DATABASE_URL || "127.0.0.1:5432"
};
const pool = new Pool(configDB);
pool.on("error", function(err) {
  console.log(err);
});

module.exports = function query(text, params, callback) {
  return pool.query(text, params, callback);
};
