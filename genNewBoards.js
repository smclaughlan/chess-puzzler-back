const {createBoardGenerator} = require('./createBoardGenerator');
const {randNum} = require('./randNum');

let boardCount = 0;
while (boardCount < 2) {
  const boardGen = createBoardGenerator();
  const testBoard = boardGen.generateBoardWithCheckmate(
      {
        // pawns
        'w_p': randNum(0, 5),
        'b_p': randNum(0, 5),
        // knights
        'w_n': randNum(0, 2),
        'b_n': randNum(0, 2),
        // bishops
        // 'w_b': randNum(0, 2),
        // 'b_b': randNum(0, 2),
        // queens
        'w_q': randNum(0, 1),
        'b_q': randNum(0, 1),
        // rooks
        // 'w_r': randNum(0, 2),
        // 'b_r': randNum(0, 2),
        // kings
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
