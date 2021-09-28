const express = require('express');
const app = express();
const fs = require('fs');
// eslint-disable-next-line new-cap
// const router = express.Router();
// const cors = require("cors");

app.use(express.json());

let puzzleBoards = [];

// load boards
fs.readFile('./storedBoards.json', 'utf8', (err, data) => {
  if (err) {
    console.log('Error reading file from disk: ', err);
  } else {
    puzzleBoards = JSON.parse(data);
    console.log('puzzleBoards length: ', puzzleBoards.length);
  }
});

/**
 * Returns a random puzzle board from the array.
 * @return {Object} puzzle board
 */
function getRandomPuzzleBoard() {
  return puzzleBoards[randNum(0, puzzleBoards.length - 1)];
}


app.get('/', (req, res) => {
  res.send({brd: getRandomPuzzleBoard()});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
