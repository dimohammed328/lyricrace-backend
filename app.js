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
const dbConfig = require("./config/database.js");
//express setup--------------------------------------------------
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser());
app.use(cors());

//passport setup-----------------------------------------------------
app.use(session({ secret: "secretkey" }));
app.use(passport.initialize());
app.use(passport.session());

//routing-------------------------------------------------------------
// require("./routes/index.js")(app, passport);
// require("./routes/users.js")(app, passport);
var loginRouter = require("./routes/login.js")(passport);
app.use("/login", loginRouter);
// app.get("/", (req, res) => res.send("Test \n"));
// app.use("/users", userRouter);

var signupRouter = require("./routes/signup.js")(passport);
app.use("/", signupRouter);

app.listen(port, () =>
  console.log(`Example app listening test on port ${port}!`)
);
