var { Pool } = require("pg");
var configDB = {
  connectionString: process.env.DATABASE_URL || "127.0.0.1:5432"
};
const pool = new Pool(configDB);
pool.on("error", function(err) {
  console.log(err);
});

<<<<<<< HEAD
module.exports = {
  query: (text, params, callback) => {
    console.log(text, params, callback);
    return pool.query(text, params, callback);
  },
  pool: pool
=======
module.exports = function query(text, params, callback) {
  return pool.query(text, params, callback);
>>>>>>> parent of d309126... authorization successful
};
