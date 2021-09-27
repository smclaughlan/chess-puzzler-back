const express = require('express');
const app = express();
const {createBoardGenerator} = require('./createBoardGenerator');
// eslint-disable-next-line new-cap
// const router = express.Router();
// const cors = require("cors");

app.use(express.json());

const boardGen = createBoardGenerator();
const testBoard = boardGen.generateBoardWithCheckmate(
    {
      'w_p': 2,
      'b_p': 2,
      'w_q': 1,
      'w_r': 1,
      'b_r': 1,
      'w_k': 1,
      'b_k': 1,
    });

app.get('/', (req, res) => {
  if (!testBoard) res.send('<div>Still generating board</div>');
  res.send({brd: testBoard});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
