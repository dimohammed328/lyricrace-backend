const express = require("express");
const app = express();
<<<<<<< HEAD
const port = process.env.PORT || 3001;
=======
const port = process.env.PORT || 3000;
const { Client, Pool } = require("pg");
>>>>>>> parent of d309126... authorization successful
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
<<<<<<< HEAD
app.use(
  session({
    // store: new pgSession({ pool: dbConfig.pool }),
    secret: "W?1.<)zsA(27Bk^",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 }
  })
);
=======
app.use(session({ secret: "secretkey" }));
>>>>>>> parent of d309126... authorization successful
app.use(passport.initialize());
app.use(passport.session());

//routing-------------------------------------------------------------
// require("./routes/index.js")(app, passport);
// require("./routes/users.js")(app, passport);
var loginRouter = require("./routes/login.js")(passport);
app.use("/login", loginRouter);
// app.get("/", (req, res) => res.send("Test \n"));
// app.use("/users", userRouter);

app.listen(port, () =>
  console.log(`Example app listening test on port ${port}!`)
);
