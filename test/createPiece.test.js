const {createPiece} = require('../createPiece');

test('piece creates pieces with correct attributes', () => {
  const testPiece = createPiece('p', 'w', 0, 0);
  const testPiece2 = createPiece('k', 'b', 5, 5);
  expect(testPiece.color).toBe('w');
  expect(testPiece.pieceType).toBe('p');
  expect(testPiece2.color).toBe('b');
  expect(testPiece2.pieceType).toBe('k');
});

test('piece isAttackingPosition works with pawn movement', () => {
  const testPiece = createPiece('p', 'w', 0, 0);
  const testPiece2 = createPiece('k', 'b', 5, 5);
  expect(testPiece.color).toBe('w');
  expect(testPiece.pieceType).toBe('p');
  expect(testPiece2.color).toBe('b');
  expect(testPiece2.pieceType).toBe('k');
});
