const {createSolver} = require('../createSolver');
const {createBoard} = require('../createBoard');

test('Solver can find checkmate', () => {
  const testBoard = createBoard();
  testBoard.addPiece(7, 7, 'b', 'k');
  testBoard.addPiece(7, 6, 'b', 'p');
  testBoard.addPiece(6, 6, 'b', 'p');
  testBoard.addPiece(0, 0, 'w', 'q');
  /**
   * ['w_q_', '____', '____', '____', '____', '____', '____', '____', ]
   * ['____', '____', '____', '____', '____', '____', '____', '____', ]
   * ['____', '____', '____', '____', '____', '____', '____', '____', ]
   * ['____', '____', '____', '____', '____', '____', '____', '____', ]
   * ['____', '____', '____', '____', '____', '____', '____', '____', ]
   * ['____', '____', '____', '____', '____', '____', '____', '____', ]
   * ['____', '____', '____', '____', '____', '____', '____', '____', ]
   * ['____', '____', '____', '____', '____', '____', 'b_p_', '____', ]
   * ['____', '____', '____', '____', '____', '____', 'b_p_', 'b_k_', ]
   */
  const testSolver = createSolver(testBoard);
  testSolver.buildMoveTree(testBoard, 'w', 0, 3);
  testSolver.buildBestMoves(testBoard, 'w', true);
  const foundMove = testBoard.bestMoveBoard;
  expect(foundMove.wScore).toBe(Infinity);
  expect(foundMove.bScore).toBe(-Infinity);
  expect(foundMove.board[0][7].pieceType).toBe('q');
});


test('Solver understands removing an attacking piece', () => {
  const testBoard2 = createBoard();
  testBoard2.addPiece(7, 7, 'b', 'k');
  testBoard2.addPiece(7, 4, 'b', 'q');
  testBoard2.addPiece(6, 6, 'b', 'n');
  testBoard2.addPiece(1, 6, 'b', 'p');
  testBoard2.addPiece(2, 0, 'w', 'q');
  testBoard2.addPiece(5, 5, 'w', 'n');
  testBoard2.addPiece(0, 1, 'w', 'k');
  testBoard2.addPiece(0, 7, 'w', 'p');
  /**
   * ['____', 'w_k_', '____', '____', '____', '____', '____', 'w_p_', ]
   * ['____', '____', '____', '____', '____', '____', 'b_p_', '____', ]
   * ['w_q_', '____', '____', '____', '____', '____', '____', '____', ]
   * ['____', '____', '____', '____', '____', '____', '____', '____', ]
   * ['____', '____', '____', '____', '____', '____', '____', '____', ]
   * ['____', '____', '____', '____', '____', 'w_n_', '____', '____', ]
   * ['____', '____', '____', '____', '____', '____', '____', '____', ]
   * ['____', '____', '____', '____', '____', '____', 'b_n_', '____', ]
   * ['____', '____', '____', '____', 'b_q_', '____', 'b_p_', 'b_k_', ]
   */
  const testSolver2 = createSolver(testBoard2);
  testSolver2.buildMoveTree(testBoard2, 'w', 0, 3);
  testSolver2.buildBestMoves(testBoard2, 'w', true);
  const foundMove = testBoard2.bestMoveBoard;
  foundMove.printBoard();
  expect(foundMove.wScore).not.toBe(Infinity);
  expect(foundMove.bScore).not.toBe(-Infinity);
});
