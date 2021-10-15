const {createBoard} = require('./createBoard');
const {createSolver} = require('./createSolver');

/**
 * Returns a boardGenerator.
 * @return {Object}
 */
function createBoardGenerator() {
  /**
   * Finds position within params and adds piece to board.
   * @param {Object} bd - board to add piece
   * @param {String} color - 'w' or 'b'
   * @param {String} pieceType - 'p', 'k', etc.
   * @param {Number} minX - minimum row inclusive
   * @param {Number} maxX - maximum row inclusive
   * @param {Number} minY - minimum column inclusive
   * @param {Number} maxY - maximum column inclusive
   * @param {Object} occupiedPos - obj keeping track of occupied positions
   */
  function randomAddToBoard(
      bd, color, pieceType, minX, maxX, minY, maxY, occupiedPos) {
    // Randomly generate row, column.
    let posX = this.randNum(minX, maxX);
    let posY = this.randNum(minY, maxY);
    let pos = `${posX} ${posY}`;
    // If that position is taken, keep randomly creating new ones.
    while (occupiedPos[pos]) {
      posX = this.randNum(minX, maxX);
      posY = this.randNum(minY, maxY);
      pos = `${posX} ${posY}`;
    }
    // Mark pos as occupied and add piece to board.
    occupiedPos[pos] = true;
    bd.addPiece(posX, posY, color, pieceType);
  }

  /**
   * Generates and returns a board with given parameters.
   * @param {Object} pieceConfig - ie {'w_p': 1, 'b_p': 1}
   * @return {Object} board with pieces added
   */
  function generateBoard(pieceConfig) {
    // Default pieceConfig.
    pieceConfig = pieceConfig ? pieceConfig : {
      'w_p': 2,
      'b_p': 2,
      'w_k': 1,
      'b_k': 1,
    };

    // Setup for generating.
    // Copy pieceConfig because sometimes the gen will fail and
    // need to be restarted.
    const currPieceConfig = {...pieceConfig};
    const occupiedPositions = {};
    const currBoard = createBoard();

    // W pawns in row 4 and 5
    while (currPieceConfig['w_p'] && currPieceConfig['w_p'] > 0) {
      this.randomAddToBoard(currBoard, 'w', 'p', 4, 5, 0, 7, occupiedPositions);
      currPieceConfig['w_p'] -= 1;
    }

    // B pawns in row 2 and 3
    while (currPieceConfig['b_p'] && currPieceConfig['b_p'] > 0) {
      this.randomAddToBoard(currBoard, 'b', 'p', 2, 3, 0, 7, occupiedPositions);
      currPieceConfig['b_p'] -= 1;
    }
    // Kings
    while (currPieceConfig['w_k'] && currPieceConfig['w_k'] > 0) {
      this.randomAddToBoard(currBoard, 'w', 'k', 0, 7, 0, 7, occupiedPositions);
      currPieceConfig['w_k'] -= 1;
    }

    while (currPieceConfig['b_k'] && currPieceConfig['b_k'] > 0) {
      this.randomAddToBoard(currBoard, 'b', 'k', 0, 7, 0, 7, occupiedPositions);
      currPieceConfig['b_k'] -= 1;
    }

    // Bishops, knights, rooks, queens go anywhere on the board.
    // Bishops
    while (currPieceConfig['w_b'] && currPieceConfig['w_b'] > 0) {
      this.randomAddToBoard(currBoard, 'w', 'b', 0, 7, 0, 7, occupiedPositions);
      currPieceConfig['w_b'] -= 1;
    }
    while (currPieceConfig['b_b'] && currPieceConfig['b_b'] > 0) {
      this.randomAddToBoard(currBoard, 'b', 'b', 0, 7, 0, 7, occupiedPositions);
      currPieceConfig['b_b'] -= 1;
    }
    // Knights
    while (currPieceConfig['w_n'] && currPieceConfig['w_n'] > 0) {
      this.randomAddToBoard(currBoard, 'w', 'n', 0, 7, 0, 7, occupiedPositions);
      currPieceConfig['w_n'] -= 1;
    }
    while (currPieceConfig['b_n'] && currPieceConfig['b_n'] > 0) {
      this.randomAddToBoard(currBoard, 'b', 'n', 0, 7, 0, 7, occupiedPositions);
      currPieceConfig['b_n'] -= 1;
    }
    // Rooks
    while (currPieceConfig['w_r'] && currPieceConfig['w_r'] > 0) {
      this.randomAddToBoard(currBoard, 'w', 'r', 0, 7, 0, 7, occupiedPositions);
      currPieceConfig['w_r'] -= 1;
    }
    while (currPieceConfig['b_r'] && currPieceConfig['b_r'] > 0) {
      this.randomAddToBoard(currBoard, 'b', 'r', 0, 7, 0, 7, occupiedPositions);
      currPieceConfig['b_r'] -= 1;
    }
    // Queens
    while (currPieceConfig['w_q'] && currPieceConfig['w_q'] > 0) {
      this.randomAddToBoard(currBoard, 'w', 'q', 0, 7, 0, 7, occupiedPositions);
      currPieceConfig['w_q'] -= 1;
    }
    while (currPieceConfig['b_q'] && currPieceConfig['b_q'] > 0) {
      this.randomAddToBoard(currBoard, 'b', 'q', 0, 7, 0, 7, occupiedPositions);
      currPieceConfig['b_q'] -= 1;
    }
    return currBoard;
  }

  /**
   * Returns a board with checkmate within maxTurns for color side.
   * @param {Object} pieceConfig
   * @param {String} color
   * @param {Number} maxTurns
   * @return {Object} board that has checkmate within maxTurns for color
   */
  function generateBoardWithCheckmate(pieceConfig, color = 'w', maxTurns = 10) {
    let foundBoard;
    while (!foundBoard) {
      console.log('Generating new board.');
      // generate a board
      const originalBoard = this.generateBoard(pieceConfig);

      // If there is a check for black on the first board
      // position, skip this board.
      if (originalBoard.isInCheck('b')) continue;

      let testBoard = originalBoard.copyBoard();
      // build its move tree and best moves / 'play' the game out
      let currTurn = 0;
      let currColor = 'w';
      while (currTurn <= maxTurns) {
        console.log('Playing move on board.');
        // Create solver, build move tree, and check.
        const testSolver = createSolver(testBoard);
        testSolver.buildMoveTree(testBoard, currColor, 0, 4);
        testSolver.buildBestMoves(testBoard, currColor);
        // See if color gets checkmate, increasing currTurns
        // console.log('testboard: ', testBoard);
        const colToCheck = color === 'w' ? 'b' : 'w';
        if (!testBoard.bestMoveBoard) break;
        if (testBoard.bestMoveBoard.isInCheckmate(colToCheck)) {
          console.log(`Found checkmate for ${color} on turn ${currTurn}.`);
          // loop again until
          // returning checkmate board found for color
          if (currTurn < 4) break;
          foundBoard = originalBoard;
          return {'findCheckmateWithin': currTurn,
            'puzzleBoard': originalBoard};
        }
        // if currTurns > maxTurns, failure, and generate a new board,
        currTurn++;
        currColor = currColor === 'w' ? 'b' : 'w';
        testBoard = testBoard.bestMoveBoard;
        // if black gets checkmate (or some other problem), try again
        if (testBoard === undefined) currTurn = Infinity;
      }
    }
  }

  /**
   * Returns random number inclusive min to max range.
   * @param {Number} min - inclusive minimum number
   * @param {Number} max - inclusive maximum number
   * @return {Number}
   */
  function randNum(min = 0, max = 7) { // inclusive of both nums
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return {
    randNum,
    randomAddToBoard,
    generateBoard,
    generateBoardWithCheckmate,
  };
}

module.exports = {
  createBoardGenerator,
};
