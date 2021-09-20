const express = require("express");
const app = express();
const router = express.Router();
// const cors = require("cors");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>hello world</h1>");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
