const { createPiece } = require("./createPiece");

/**
 * Returns a new board.
 * @return {Object} - board
 */
function createBoard() {
  const board = [
    [
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
    ],
    [
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
    ],
    [
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
    ],
    [
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
    ],
    [
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
    ],
    [
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
    ],
    [
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
    ],
    [
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
      "____",
    ],
  ];

  const children = [];
  let wScore = 0;
  let bScore = 0;
  const wPieces = [];
  const bPieces = [];

  /**
   * Adds piece to the board.
   * @param {Number} x
   * @param {Number} y
   * @param {String} color - 'w' or 'b'
   * @param {String} pieceType - 'p', 'k', etc.
   */
  function addPiece(x, y, color, pieceType) {
    if (this.board[x] === undefined) {
      console.log("this.board: ", this.board);
      console.log("x: ", x);
      console.log("y: ", y);
    }
    if (this.board[x][y] === undefined) {
      console.log(
        "Invalid placement of piece. Piece not added."
      );
      return;
    }

    if (
      this.board[x][y] !== undefined &&
      this.board[x][y] !== "____"
    ) {
      // We're adding into a position with a piece
      // so remove that piece first.
      this.removePiece(x, y);
    }

    const piece = createPiece(pieceType, color, x, y);
    this.board[x][y] = piece;
    if (color === "w") {
      this.wPieces.push(piece);
      this.wScore += piece.pieceValue;
      this.bScore -= piece.pieceValue;
    } else if (color === "b") {
      this.bPieces.push(piece);
      this.wScore -= piece.pieceValue;
      this.bScore += piece.pieceValue;
    }
  }

  /**
   * Returns entirely new board object.
   * @return {Object} - copy of board
   */
  function copyBoard() {
    const newBoard = createBoard();
    // Create new pieces from previous board.
    for (let x = 0; x < this.board.length; x++) {
      for (let y = 0; y < this.board[x].length; y++) {
        const prevBoardPiece = this.board[x][y];
        if (prevBoardPiece !== "____") {
          newBoard.addPiece(
            x,
            y,
            prevBoardPiece.color,
            prevBoardPiece.pieceType
          );
        }
      }
    }

    return newBoard;
  }

  /**
   * Returns object w/ two arrays, for pieces on each color side.
   * @return {Object} - containing wPieces and bPieces arrays
   */
  function getPieces() {
    const wPieces = this.wPieces;
    const bPieces = this.bPieces;
    return {
      wPieces,
      bPieces,
    };
  }

  /**
   * Returns object containing scores for colored sides.
   * @return {Object} - contains 'wScore', 'bScore' keys
   * with score values
   */
  function getScore() {
    const wScore = this.wScore;
    const bScore = this.bScore;
    return { wScore, bScore };
  }

  /**
   * Returns true if color side King is in check.
   * @param {String} color - 'w' or 'b'
   * @return {Boolean}
   */
  function isInCheck(color) {
    let pieces;
    if (color === "w") {
      pieces = this.bPieces;
    } else if (color === "b") {
      pieces = this.wPieces;
    }
    for (const piece of pieces) {
      if (piece.isAttackingOpponentKing(this)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns true if color side King is in checkmate.
   * @param {String} color - 'w' or 'b'
   * @return {Boolean}
   */
  function isInCheckmate(color) {
    // get the king for the correct side
    let king;
    if (color === "w") {
      for (const piece of wPieces) {
        if (piece.pieceType === "k") king = piece;
      }
    } else if (color === "b") {
      for (const piece of bPieces) {
        if (piece.pieceType === "k") king = piece;
      }
    }

    // If there's no king, there's no checkmate
    if (king === undefined) return false;

    // check all positions
    // if even one position is NOT check, return false
    // otherwise return true
    const validMoves = king.getValidMoves(this, true);
    // also need to check the king's current position
    const isCurrentlyInCheck = this.isInCheck(color);

    if (validMoves.length === 0 && isCurrentlyInCheck) {
      // Get all pieces attacking king
      const piecesAttackingKing = [];
      let allOpponentPieces;
      let defendingPieces;
      if (color === "w") {
        defendingPieces = this.wPieces;
        allOpponentPieces = this.bPieces;
      } else if (color === "b") {
        defendingPieces = this.bPieces;
        allOpponentPieces = this.wPieces;
      }
      for (const piece of allOpponentPieces) {
        if (piece.isAttackingOpponentKing(this)) {
          piecesAttackingKing.push(piece);
        }
      }
      // Test if any friendly pieces can attack piecesAttackingKing
      for (const attackingPiece of piecesAttackingKing) {
        for (const defendingPiece of defendingPieces) {
          // If any dending piece can remove attack on king, no checkmate.
          const defendingPieceCanRemoveAttacker =
            defendingPiece.isAttackingPosition(
              this,
              attackingPiece.position
            );
          if (defendingPieceCanRemoveAttacker) {
            return false;
          }
        }
      }

      if (king.color === "w") {
        this.wScore = -Infinity;
        this.bScore = Infinity;
      } else if (king.color === "b") {
        this.bScore = -Infinity;
        this.wScore = Infinity;
      }
      return true;
    }
    return false;
  }

  /**
   * Prints the board to the console.
   */
  function printBoard() {
    const { wScore, bScore } = this.getScore();
    console.log(
      `bestMoveBoard scores: w: ${wScore} b: ${bScore}`
    );
    const letters = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
    ];
    const nums = ["8", "7", "6", "5", "4", "3", "2", "1"];
    for (let i = 0; i < this.board.length; i++) {
      console.log(nums[i], this.board[i].join(" "));
    }
    console.log(`   ${letters.join("    ")}`);
  }

  /**
   * Removes a piece from the board.
   * @param {Number} x
   * @param {Number} y
   */
  function removePiece(x, y) {
    // Update the scores when removing piece
    const removedPiece = this.board[x][y];
    if (
      removedPiece !== "____" ||
      removedPiece !== undefined
    ) {
      const removedPieceVal = removedPiece.pieceValue;
      const removedPieceColor = removedPiece.color;
      if (removedPieceColor === "w") {
        this.wScore -= removedPieceVal;
        this.bScore += removedPieceVal;
      } else if (removedPieceColor === "b") {
        this.wScore += removedPieceVal;
        this.bScore -= removedPieceVal;
      }
    }

    this.board[x][y] = "____";

    // Remove piece from the arrays
    this.wPieces.forEach((piece, idx) => {
      const [posX, posY] = piece.position;
      if (posX === x && posY === y) {
        this.wPieces.splice(idx, 1);
      }
    });

    this.bPieces.forEach((piece, idx) => {
      const [posX, posY] = piece.position;
      if (posX === x && posY === y) {
        this.bPieces.splice(idx, 1);
      }
    });
  }

  return {
    board,
    children,
    wScore,
    bScore,
    wPieces,
    bPieces,
    addPiece,
    copyBoard,
    getScore,
    getPieces,
    isInCheck,
    isInCheckmate,
    printBoard,
    removePiece,
  };
}

module.exports = {
  createBoard,
};
