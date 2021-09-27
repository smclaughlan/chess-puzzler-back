const {createBoard} = require('./createBoard');
const {createSolver} = require('./createSolver');

console.log('===START===');
const gameBoard = createBoard();
gameBoard.addPiece(4, 1, 'w', 'k');
// gameBoard.addPiece(0, 1, 'b', 'b');
gameBoard.addPiece(6, 4, 'w', 'q');
gameBoard.addPiece(0, 4, 'w', 'q');
gameBoard.addPiece(1, 4, 'w', 'q');
// gameBoard.addPiece(2, 0, 'b', 'p');
// gameBoard.addPiece(0, 0, 'b', 'p');
gameBoard.addPiece(7, 7, 'b', 'k');
gameBoard.printBoard();

// Start
const gameSolver = createSolver(gameBoard);
gameSolver.buildMoveTree(gameBoard, 'w', 0, 3);
gameSolver.buildBestMoves(gameBoard, 'w', true);
gameSolver.playBestMovesRecursive(gameBoard);


// TODO
// One option is to play random games off each move and take the highest score that way, only saving and averaging scores
// Then take the highest one

// When building out the move tree try only taking the options which give higher scores

// Get checkmate working
// isInCheckmate needs to also check that the king is in check. Ie right now it just checks that the king can't move but that's not enough
// Knight moves



// gameBoard.bestMoveBoard.printBoard();
// gameBoard.bestMoveBoard.bestMoveBoard.printBoard();
// gameBoard.bestMoveBoard.bestMoveBoard.bestMoveBoard.printBoard();

// console.log(gameBoard.children.length);
// let boardNum = '1';
// gameBoard.children.forEach(board => {
//   console.log('Board ', boardNum, ': ');
//   board.printBoard();
//   boardNum++;
// });

// const copiedBoard = gameBoard.copyBoard();

// console.log('Scores:');
// console.log(copiedBoard.wScore);
// console.log(copiedBoard.bScore);

// const {wPieces, bPieces} = gameBoard.getPieces();
// console.log(wPieces[0]);
// console.log(wPieces[0].getValidMoves(gameBoard));
