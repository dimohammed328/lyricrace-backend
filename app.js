const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./routes/users");
app.get("/", (req, res) => res.send("Test \n"));
app.use("/users", userRouter);

app.listen(port, () =>
  console.log(`Example app listening test on port ${port}!`)
);
