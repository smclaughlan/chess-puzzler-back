const { pieceValue } = require("./pieceValue");

const wPawnMoves = [
  {
    moveTo: [-1, 0],
    canCapture: false,
  },
  {
    moveTo: [-1, -1],
    mustCapture: true,
  },
  {
    moveTo: [-1, 1],
    mustCapture: true,
  },
];

const bPawnMoves = [
  {
    moveTo: [1, 0],
    canCapture: false,
  },
  {
    moveTo: [1, -1],
    mustCapture: true,
  },
  {
    moveTo: [1, 1],
    mustCapture: true,
  },
];

const kMoves = [
  {
    moveTo: [-1, -1],
  },
  {
    moveTo: [-1, 0],
  },
  {
    moveTo: [-1, 1],
  },
  {
    moveTo: [0, 1],
  },
  {
    moveTo: [1, 1],
  },
  {
    moveTo: [1, 0],
  },
  {
    moveTo: [1, -1],
  },
  {
    moveTo: [0, -1],
  },
];

const bMoves = [
  {
    moveTo: [
      [-1, -1],
      [-2, -2],
      [-3, -3],
      [-4, -4],
      [-5, -5],
      [-6, -6],
      [-7, -7],
      [-8, -8],
    ],
  },
  {
    moveTo: [
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
      [5, 5],
      [6, 6],
      [7, 7],
      [8, 8],
    ],
  },
  {
    moveTo: [
      [-1, 1],
      [-2, 2],
      [-3, 3],
      [-4, 4],
      [-5, 5],
      [-6, 6],
      [-7, 7],
      [-8, 8],
    ],
  },
  {
    moveTo: [
      [1, -1],
      [2, -2],
      [3, -3],
      [4, -4],
      [5, -5],
      [6, -6],
      [7, -7],
      [8, -8],
    ],
  },
];

const rMoves = [
  {
    moveTo: [
      [0, -1],
      [0, -2],
      [0, -3],
      [0, -4],
      [0, -5],
      [0, -6],
      [0, -7],
      [0, -8],
    ],
  },
  {
    moveTo: [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 8],
    ],
  },
  {
    moveTo: [
      [-1, 0],
      [-2, 0],
      [-3, 0],
      [-4, 0],
      [-5, 0],
      [-6, 0],
      [-7, 0],
      [-8, 0],
    ],
  },
  {
    moveTo: [
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
    ],
  },
];

const qMoves = [
  {
    moveTo: [
      [-1, -1],
      [-2, -2],
      [-3, -3],
      [-4, -4],
      [-5, -5],
      [-6, -6],
      [-7, -7],
      [-8, -8],
    ],
  },
  {
    moveTo: [
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
      [5, 5],
      [6, 6],
      [7, 7],
      [8, 8],
    ],
  },
  {
    moveTo: [
      [-1, 1],
      [-2, 2],
      [-3, 3],
      [-4, 4],
      [-5, 5],
      [-6, 6],
      [-7, 7],
      [-8, 8],
    ],
  },
  {
    moveTo: [
      [1, -1],
      [2, -2],
      [3, -3],
      [4, -4],
      [5, -5],
      [6, -6],
      [7, -7],
      [8, -8],
    ],
  },
  {
    moveTo: [
      [0, -1],
      [0, -2],
      [0, -3],
      [0, -4],
      [0, -5],
      [0, -6],
      [0, -7],
      [0, -8],
    ],
  },
  {
    moveTo: [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 8],
    ],
  },
  {
    moveTo: [
      [-1, 0],
      [-2, 0],
      [-3, 0],
      [-4, 0],
      [-5, 0],
      [-6, 0],
      [-7, 0],
      [-8, 0],
    ],
  },
  {
    moveTo: [
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
    ],
  },
];

const nMoves = [
  {
    moveTo: [-2, 1], // up 2, right 1
  },
  {
    moveTo: [-1, 2], // up 1, right 2
  },
  {
    moveTo: [1, 2], // down 1, right 2
  },
  {
    moveTo: [2, 1], // down 2, right 1
  },
  {
    moveTo: [2, -1], // down 2, left 1
  },
  {
    moveTo: [1, -2], // down 1, left 2
  },
  {
    moveTo: [-1, -2], // up 1, left 2
  },
  {
    moveTo: [-2, -1], // up 2, left 1
  },
];

/**
 * Returns new piece of type, on color side.
 * Had methods for moving piece, checking if move is valid.
 * @param {String} pieceType - 'p', 'k', etc
 * @param {String} color - 'w' or 'b'
 * @param {Number} x
 * @param {Number} y
 * @return {Object} piece object
 */
function createPiece(pieceType, color, x, y) {
  let moves = {};
  const position = [x, y];

  if (pieceType === "p") {
    if (color === "w") {
      moves = wPawnMoves;
    } else {
      moves = bPawnMoves;
    }
  } else if (pieceType === "k") {
    moves = kMoves;
  } else if (pieceType === "b") {
    moves = bMoves;
  } else if (pieceType === "r") {
    moves = rMoves;
  } else if (pieceType === "q") {
    moves = qMoves;
  } else if (pieceType === "n") {
    moves = nMoves;
  } else {
    console.log("Invalid pieceType in createPiece!");
  }

  /**
   * Return an array of all valid moves.
   * @param {Object} bd - board that piece is on
   * @param {Boolean} checkForCheck - check for checks on kings
   * @return {Array} valid moves
   */
  function getValidMoves(bd, checkForCheck = true) {
    /*
    Iterate over this.moves.

    Not valid if:
    * Move lands on friendly piece.
    * Move lands off board.
    * Move creates friendly check.
      * Need to create a new board, move piece, test for check.
    * Move is incremental (ie bishop/rook) and end position is
    blocked off by any piece

    If those pass, add to return arr
    as nested arr [endPosx, endPosY]
    */

    const validMoves = [];
    // TODO Refactor below, DRY.

    // Check pawn moves
    if (this.pieceType === "p") {
      // pawns have canCapture: false on the move ahead
      // and mustCapture: true on moves to capture diagonally
      this.moves.forEach((move) => {
        const [startX, startY] = this.position;
        const [relativeX, relativeY] = move.moveTo;
        const endPosX = startX + relativeX;
        const endPosY = startY + relativeY;
        const endPosOnBoard = bd.board[endPosX]?.[endPosY];
        const isEmptyEndPos = endPosOnBoard === "____";
        const isOpponentPiece =
          !isEmptyEndPos &&
          endPosOnBoard !== undefined &&
          endPosOnBoard.color !== this.color;
        if (move.canCapture === false) {
          if (isEmptyEndPos) {
            /*
              Good so far.
              * Copy the board.
              * Do the move.
              * Check for check of same color as piece.

              If that's good, only then is it a valid move.
            */
            if (checkForCheck) {
              const newBoard = bd.copyBoard();
              newBoard.removePiece(startX, startY);
              newBoard.addPiece(
                endPosX,
                endPosY,
                this.color,
                this.pieceType
              );
              const moveCreatesCheck = newBoard.isInCheck(
                this.color
              );
              if (!moveCreatesCheck) {
                validMoves.push({
                  endPosX,
                  endPosY,
                  notAttack: true,
                });
              }
            } else {
              validMoves.push({
                endPosX,
                endPosY,
                notAttack: true,
              });
            }
          }
        } else if (move.mustCapture === true) {
          if (isOpponentPiece) {
            /*
              Good so far.
              * Copy the board.
              * Do the move.
              * Check for check of same color as piece.

              If that's good, only then is it a valid move.
            */
            if (checkForCheck) {
              const newBoard = bd.copyBoard();
              newBoard.removePiece(startX, startY);
              newBoard.addPiece(
                endPosX,
                endPosY,
                this.color,
                this.pieceType
              );
              const moveCreatesCheck = newBoard.isInCheck(
                this.color
              );
              if (!moveCreatesCheck) {
                validMoves.push({ endPosX, endPosY });
              }
            } else {
              validMoves.push({ endPosX, endPosY });
            }
          }
        }
      });
      // Check King moves
    } else if (
      this.pieceType === "k" ||
      this.pieceType === "n"
    ) {
      // No special concerns with King moves.
      this.moves.forEach((move) => {
        const [startX, startY] = this.position;
        const [relativeX, relativeY] = move.moveTo;
        const endPosX = startX + relativeX;
        const endPosY = startY + relativeY;
        const endPosOnBoard = bd.board[endPosX]?.[endPosY];
        const isEmptyEndPos = endPosOnBoard === "____";
        const isOpponentPiece =
          !isEmptyEndPos &&
          endPosOnBoard !== undefined &&
          endPosOnBoard.color !== this.color;
        if (isEmptyEndPos || isOpponentPiece) {
          /*
            Good so far.
            * Copy the board.
            * Do the move.
            * Check for check of same color as piece.

            If that's good, only then is it a valid move.
          */
          if (checkForCheck) {
            const newBoard = bd.copyBoard();
            newBoard.removePiece(startX, startY);
            newBoard.addPiece(
              endPosX,
              endPosY,
              this.color,
              this.pieceType
            );
            const moveCreatesCheck = newBoard.isInCheck(
              this.color
            );
            if (!moveCreatesCheck) {
              validMoves.push({ endPosX, endPosY });
            }
          } else {
            validMoves.push({ endPosX, endPosY });
          }
        }
      });
    } else if (
      this.pieceType === "b" ||
      this.pieceType === "r" ||
      this.pieceType === "q"
    ) {
      // Bishops have incremental movements.
      // Their moves.move will be an array of nested arrays
      // of moves that step further away from the start position
      // So once we reach a spot with any piece, or undefined
      // we can stop there.
      this.moves.forEach((incrementalMove) => {
        // incrementalMove variable here refers to
        // obj moveTo: [[1,1], [2,2] ...etc]
        // Change to the actual array
        incrementalMove = incrementalMove["moveTo"];
        const [startX, startY] = this.position;
        for (const incrementalStep of incrementalMove) {
          // incrementalStep = [1,1] etc
          const [relativeX, relativeY] = incrementalStep;
          const endPosX = startX + relativeX;
          const endPosY = startY + relativeY;
          const endPosOnBoard =
            bd.board[endPosX]?.[endPosY];
          const isEmptyEndPos = endPosOnBoard === "____";
          if (isEmptyEndPos) {
            /*
            Good so far.
            * Copy the board.
            * Do the move.
            * Check for check of same color as piece.

            If that's good, only then is it a valid move.
            */
            if (checkForCheck) {
              const newBoard = bd.copyBoard();
              newBoard.removePiece(startX, startY);
              newBoard.addPiece(
                endPosX,
                endPosY,
                this.color,
                this.pieceType
              );
              const moveCreatesCheck = newBoard.isInCheck(
                this.color
              );
              if (!moveCreatesCheck) {
                validMoves.push({ endPosX, endPosY });
              }
            } else {
              validMoves.push({ endPosX, endPosY });
            }
          } else {
            // Now we've hit undefined, friendly piece, or opponent piece
            // Always break from loop afterwards as we can't keep going
            // after this

            // But if it's an opponent piece, we'll add it as valid move
            if (
              endPosOnBoard !== undefined &&
              endPosOnBoard.color !== this.color
            ) {
              /*
              Good so far.
              * Copy the board.
              * Do the move.
              * Check for check of same color as piece.

              If that's good, only then is it a valid move.
              */
              if (checkForCheck) {
                const newBoard = bd.copyBoard();
                newBoard.removePiece(startX, startY);
                newBoard.addPiece(
                  endPosX,
                  endPosY,
                  this.color,
                  this.pieceType
                );
                const moveCreatesCheck = newBoard.isInCheck(
                  this.color
                );
                if (!moveCreatesCheck) {
                  validMoves.push({ endPosX, endPosY });
                }
              } else {
                validMoves.push({ endPosX, endPosY });
              }
            }
            break;
          }
        }
      });
    }

    return validMoves;
  }

  /**
   * Returns true if piece puts opponent King in check.
   * @param {Object} bd - board that piece is on
   * @return {Boolean}
   */
  function isAttackingOpponentKing(bd) {
    /*
    Get valid moves.
    Return true if end pos is on opponent king.
    */
    const validMoves = this.getValidMoves(bd, false);
    for (const move of validMoves) {
      const { endPosX, endPosY, notAttack } = move;
      if (!notAttack) {
        const endPos = bd.board[endPosX][endPosY];
        if (
          endPos?.pieceType === "k" &&
          endPos?.color !== this.color
        ) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Returns true if the piece is attacking the posArr [x, y].
   * @param {Object} bd - board
   * @param {Arr} posArr - [x, y]
   * @return {Boolean}
   */
  function isAttackingPosition(bd, posArr) {
    const [x, y] = posArr;
    const validMoves = this.getValidMoves(bd, true);
    for (const move of validMoves) {
      const { endPosX, endPosY, notAttack } = move;
      if (notAttack === true) continue;
      if (x === endPosX && y === endPosY) return true;
    }
    return false;
  }

  return {
    color,
    moves,
    pieceType,
    pieceValue: pieceValue[pieceType],
    position,
    getValidMoves,
    isAttackingOpponentKing,
    isAttackingPosition,
    toString: function () {
      return `${this.color}_${this.pieceType}_`;
    },
  };
}

module.exports = {
  createPiece,
};
