const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require("./routes/users");
const cors = require("cors");
app.use(cors());
app.get("/", (req, res) => res.send("Test \n"));
app.use("/users", userRouter);

app.listen(port, () =>
  console.log(`Example app listening test on port ${port}!`)
);
