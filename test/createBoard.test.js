const {createBoard} = require('../createBoard');

const testBoard = createBoard();
const testBoard2 = createBoard();
const testBoard3 = createBoard();

test('createBoard board exists with correct dimensions', () => {
  expect(testBoard.board.length).toBe(8);
  expect(testBoard.board[0].length).toBe(8);
});

test('board can add a piece and piece will have correct type and color', () => {
  testBoard.addPiece(0, 0, 'w', 'p');
  expect(testBoard.board[0][0].color).toBe('w');
  expect(testBoard.board[0][0].pieceType).toBe('p');
});

test('board adding a piece updates board arrays containing pieces', () => {
  testBoard.addPiece(1, 1, 'b', 'p');
  expect(testBoard.wPieces.length).toBe(1);
  expect(testBoard.bPieces.length).toBe(1);
});

test('board can return scores accurately for one pawn for each side', () => {
  const {wScore, bScore} = testBoard.getScore();
  expect(wScore).toBe(0);
  expect(bScore).toBe(0);
});

test('board can return scores accurately with more pieces', () => {
  testBoard.addPiece(5, 5, 'w', 'q');
  const {wScore, bScore} = testBoard.getScore();
  expect(wScore).toBe(1000);
  expect(bScore).toBe(-1000);
});

test('board can check if black King is in check', () => {
  testBoard.addPiece(4, 5, 'b', 'k');
  expect(testBoard.isInCheck('b')).toBe(true);
});

test('board can check if white King is NOT in check', () => {
  testBoard.addPiece(7, 7, 'w', 'k');
  expect(testBoard.isInCheck('w')).toBe(false);
});

test('board can tell that black is in checkmate', () => {
  testBoard2.addPiece(0, 0, 'b', 'k');
  testBoard2.addPiece(1, 1, 'w', 'q');
  testBoard2.addPiece(1, 0, 'w', 'q');
  expect(testBoard2.isInCheckmate('b')).toBe(true);
});

test('board can tell that white is NOT in checkmate', () => {
  testBoard2.addPiece(5, 5, 'w', 'k');
  expect(testBoard2.isInCheckmate('b')).toBe(true);
});

test('board can be copied and has same num of pieces as original board', () => {
  const copiedBoard = testBoard.copyBoard();
  const wPiecesTestBoard = testBoard.getPieces()['wPieces'];
  const wPiecesCopiedBoard = copiedBoard.getPieces()['wPieces'];
  expect(wPiecesTestBoard.length).toBe(wPiecesCopiedBoard.length);
});

test('board can remove a piece, updating board and piece arrays', () => {
  testBoard3.addPiece(0, 0, 'w', 'k');
  testBoard3.addPiece(1, 1, 'b', 'k');
  expect(testBoard3.wPieces.length).toBe(1);
  expect(testBoard3.board[0][0].pieceType).toBe('k');
  expect(testBoard3.bPieces.length).toBe(1);
  expect(testBoard3.board[1][1].pieceType).toBe('k');
  testBoard3.removePiece(0, 0);
  testBoard3.removePiece(1, 1);
  expect(testBoard3.wPieces.length).toBe(0);
  expect(testBoard3.bPieces.length).toBe(0);
});
