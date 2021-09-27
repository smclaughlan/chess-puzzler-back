const {createBoard} = require('./createBoard');
const {createSolver} = require('./createSolver');
const {createBoardGenerator} = require('./createBoardGenerator');

// const boardGen = createBoardGenerator();
// const testBoard = boardGen.generateBoardWithCheckmate(
//     {
//       'w_p': 3,
//       'b_p': 3,
//       'w_q': 1,
//       'w_r': 1,
//       'b_r': 2,
//       'w_k': 1,
//       'b_k': 1,
//     });

// =====
const testBoard = createBoard();

// test for easy checkmate
// testBoard.addPiece(7, 7, 'b', 'k');
// testBoard.addPiece(7, 6, 'b', 'p');
// testBoard.addPiece(6, 6, 'b', 'p');
// testBoard.addPiece(0, 0, 'w', 'q');

// test for removing 'almost checkmate' situation
// testBoard.addPiece(7, 7, 'b', 'k');
// testBoard.addPiece(7, 4, 'b', 'q');
// testBoard.addPiece(6, 6, 'b', 'n');
// testBoard.addPiece(1, 6, 'b', 'p');
// testBoard.addPiece(2, 0, 'w', 'q');
// testBoard.addPiece(5, 5, 'w', 'n');
// testBoard.addPiece(0, 1, 'w', 'k');
// testBoard.addPiece(0, 7, 'w', 'p');

// random testing
testBoard.addPiece(0, 2, 'b', 'r');
testBoard.addPiece(0, 7, 'b', 'k');
testBoard.addPiece(1, 0, 'b', 'r');
testBoard.addPiece(2, 6, 'b', 'p');
testBoard.addPiece(3, 1, 'b', 'p');
testBoard.addPiece(3, 7, 'b', 'p');

testBoard.addPiece(2, 7, 'w', 'k');
testBoard.addPiece(3, 0, 'w', 'r');
testBoard.addPiece(4, 5, 'w', 'q');
testBoard.addPiece(5, 0, 'w', 'p');
testBoard.addPiece(5, 3, 'w', 'p');
testBoard.addPiece(5, 5, 'w', 'p');
const testSolver = createSolver(testBoard);
testSolver.buildMoveTree(testBoard, 'w', 0, 3);
testSolver.buildBestMoves(testBoard, 'w');

console.log(
    '=============================START=============================');
testBoard.printBoard();
testSolver.playBestMovesRecursive(testBoard, 'w', 20);
