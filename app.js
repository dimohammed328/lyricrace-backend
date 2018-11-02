const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const { Client, Pool } = require("pg");
const passport = require("passport");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
require("./config/passport")(passport);

//databse config------------------------------------------------
const { query } = require("./config/database.js");
//express setup--------------------------------------------------
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser());
app.use(cors());

//passport setup-----------------------------------------------------
app.use(session({ secret: "W?1.<)zsA(27Bk^" }));
app.use(passport.initialize());
app.use(passport.session());

//routing-------------------------------------------------------------

var loginRouter = require("./routes/login.js")(passport);
app.use("/login", loginRouter);

var signupRouter = require("./routes/signup.js")(passport);
app.use("/signup", signupRouter);

var authenticateRouter = require("./routes/authenticate.js")(passport);
app.use("/", authenticateRouter);

app.listen(port, () =>
  console.log(`Example app listening test on port ${port}!`)
);
