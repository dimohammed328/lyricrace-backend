const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const passport = require("passport");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
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
<<<<<<< HEAD

var signupRouter = require("./routes/signup.js")(passport);
app.use("/signup", signupRouter);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of d309126... authorization successful
=======
>>>>>>> parent of fdded4a... Adding sessions
=======
>>>>>>> parent of fdded4a... Adding sessions

app.listen(port, () =>
  console.log(`Example app listening test on port ${port}!`)
);
