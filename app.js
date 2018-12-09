const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const passport = require("passport");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const pgSession = require("connect-pg-simple")(session);
require("./config/passport")(passport);

//databse config------------------------------------------------
const db = require("./config/database.js");
//express setup--------------------------------------------------
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser());
app.use(cors());

//passport setup-----------------------------------------------------
app.use(
  session({
    store: new pgSession({ pool: db.pool }),
    secret: "secretkey",
    cookie: { maxAge: 60 * 60 * 1000 },
    name: "sessionID"
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  db.query(
    "SELECT sess FROM session WHERE sid=$1",
    [req.body.sessionID],
    (err, result) => {
      console.log(req.body);
      if (err) {
        console.log("Error when selecting user on login", err);
        return next(err);
      }
      if (result.rows.length > 0) {
        req.auth = true;
        req.user = result.rows[0].sess.passport.user;
        return next();
      } else {
        req.auth = false;
        return next();
      }
    }
  );
});
//routing-------------------------------------------------------------
// require("./routes/index.js")(app, passport);
// require("./routes/users.js")(app, passport);
var loginRouter = require("./routes/login.js")(passport);
app.use("/login", loginRouter);
// app.get("/", (req, res) => res.send("Test \n"));
// app.use("/users", userRouter);

var signupRouter = require("./routes/signup.js")(passport);
app.use("/signup", signupRouter);

var songselectionRouter = require("./routes/songselection.js")();
app.use("/songselection", songselectionRouter);

var leaderboardRouter = require("./routes/leaderboard.js")();
app.get("/leaderboard/:id", (req, res, next) => {
  db.query(
    `SELECT users.username, songs.title, scores.timesec, songid FROM scores JOIN users ON users.id=scores.userid JOIN songs ON scores.songid=songs.id where ${
      req.params.id
    }=songid`,
    [],
    (err, result) => {
      if (err) {
        console.log("Error", err);
        return next(err);
      } else {
        res.send(result);
      }
    }
  );
});

var authenticateRouter = require("./routes/authenticate.js")(passport);
app.use("/authenticate", authenticateRouter);

app.listen(port, () =>
  console.log(`Example app listening test on port ${port}!`)
);
