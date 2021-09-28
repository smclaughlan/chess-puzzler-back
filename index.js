const express = require('express');
const app = express();
const fs = require('fs');
const {createBoardGenerator} = require('./createBoardGenerator');
// eslint-disable-next-line new-cap
// const router = express.Router();
// const cors = require("cors");

app.use(express.json());

const puzzleBoards = [];

let boardCount = 0;
while (boardCount < 1) {
  const boardGen = createBoardGenerator();
  const testBoard = boardGen.generateBoardWithCheckmate(
      {
        'w_p': 2,
        'b_p': 2,
        'w_n': 1,
        'w_r': 2,
        'b_r': 1,
        'w_k': 1,
        'b_k': 1,
      });
  puzzleBoards.push(testBoard);
  updateStoredBoards(testBoard);
  boardCount++;
  console.log('boardCount: ', boardCount);
}

/**
 * Save a board to the json file.
 * @param {Object} newBoard - board to add to stored files
 */
function updateStoredBoards(newBoard) {
  fs.readFile('./storedBoards.json', 'utf8', (err, data) => {
    if (err) {
      console.log('Error reading file from disk: ', err);
    } else {
      const storedBoards = JSON.parse(data);
      console.log('storedBoards start length: ', storedBoards.length);
      storedBoards.push(newBoard);
      if (storedBoards.length >= 1000) storedBoards.shift();
      console.log('storedBoards end length: ', storedBoards.length);

      fs.writeFile('./storedBoards.json',
          JSON.stringify(storedBoards, null, 4), (err) => {
            if (err) {
              console.log('Error writing file: ', err);
            }
          });
    }
  });
}

// write JSON string to a file
// fs.writeFile('user.json', data, (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log("JSON data is saved.");
// });

/**
 * Returns random number inclusive of min and max.
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
function randNum(min = 0, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
