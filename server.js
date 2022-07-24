const express = require("express");
const { resolve } = require("path");
const app = express();
const listenPort = process.env.PORT || 3000;

app.use("/", express.static(
  resolve(
    __dirname,
    "./build"
  )
));
app.listen(listenPort, () => {
  console.log("server running on port " + listenPort);
});
