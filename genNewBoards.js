const {createBoardGenerator} = require('./createBoardGenerator');
const {randNum} = require('./randNum');
const fs = require('fs');

let boardCount = 0;
while (boardCount < 1) {
  const boardGen = createBoardGenerator();
  const testBoard = boardGen.generateBoardWithCheckmate(
      {
        // pawns
        'w_p': 2,
        'b_p': 2,
        // knights
        'w_n': 2,
        'b_n': 2,
        // bishops
        'w_b': 1,
        'b_b': 0,
        // queens
        'w_q': 0,
        'b_q': 0,
        // rooks
        'w_r': 0,
        'b_r': 0,
        // kings
        'w_k': 1,
        'b_k': 1,
      });
  updateStoredBoards(testBoard);
  boardCount++;
  console.log('boardCount: ', boardCount);
}

/**
 * Save a board to the json file.
 * @param {Object} newBoard - {'findCheckmateWithin': turnNumber,
 * 'puzzleBoard': boardObj}
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
