const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;
const routes = require("./routes/allroutes")

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use("/api", routes)


app.listen(port, () => {
  console.log(`server run on this port ${port}`);
});