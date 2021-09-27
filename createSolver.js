
/**
 * Makes moveTree and finds best moves.
 * @param {Object} board
 * @param {String} currTurn - 'w' or 'b'
 * @return {Object} new solver object
 */
function createSolver(board) {
  const nextTurn = {
    w: 'b',
    b: 'w',
  };

  /**
   * Fills out the board objects with bestMoveBoard property.
   * @param {Object} currentBoard - parent/current board
   * @param {String} turnCol - 'w' or 'b'
   * @param {Boolean} isFirstTurn - is it the first turn
   * @return {Object} bestMoveBoard object
   */
  function buildBestMoves(currentBoard, turnCol = 'w', isFirstTurn = false) {
    /*
    On the first turn we can just do a findBestMoveBoard
    Then call the function on the children of that board
    */
    if (isFirstTurn) {
      currentBoard['bestMoveBoard'] =
          this.findBestMoveBoard(currentBoard, turnCol);

      if (currentBoard['bestMoveBoard'] !== undefined) {
        this.buildBestMoves(
            currentBoard['bestMoveBoard'],
            this.nextTurn[turnCol]);
      }
    } else {
      /*
      Not the first turn, so
      children.length === 0, return currBoard
      Otherwise find the bestMoveBoard for each child
      */
      if (currentBoard.children === undefined) {
        return currentBoard;
      }

      // If no children, return currentBoard
      if (currentBoard.children.length === 0) {
        return currentBoard;
      }

      let bestMoveScore = -Infinity;
      let bestMoveBoard;
      for (let index = 0; index < currentBoard.children.length; index++) {
        const child = currentBoard.children[index];
        // if we find a checkmate in a child board for opposite side color
        // make that the bestMoveBoard and break from loop
        if (child.isInCheckmate(this.nextTurn[turnCol])) {
          bestMoveBoard = child;
          break;
        }

        // Get the bestMoveBoard for each child, of opposite color
        // knowing that other turn will play their best move
        // Then we'll find our best move off each of those moves
        const childBest = this.findBestMoveBoard(child, this.nextTurn[turnCol]);
        // childBestMoves.push(childBest);
        const currBestOffChildBest = this.findBestMoveBoard(childBest, turnCol);
        if (currBestOffChildBest) {
          const key = `${turnCol}Score`;
          if (currBestOffChildBest[key] >= bestMoveScore) {
            bestMoveScore = currBestOffChildBest[key];
            bestMoveBoard = child;
          }
        }
      };

      currentBoard['bestMoveBoard'] = bestMoveBoard;
      // Clear out unnecessary children
      currentBoard.children = [bestMoveBoard];
      if (bestMoveBoard) {
        this.buildBestMoves(
            currentBoard['bestMoveBoard'], this.nextTurn[turnCol]);
      }

      return currentBoard['bestMoveBoard'];
    }
  }

  /**
   * Builds the move tree recursively off parent board.
   * @param {*} parent - the board which will have child boards built out
   * @param {String} turnCol - color of turn 'w' or 'b'
   * @param {Number} currDepth - number of moves deep
   * @param {Number} maxDepth - number of moves deep to stop filling out tree
   */
  function buildMoveTree(parent, turnCol = 'w', currDepth = 0, maxDepth = 5) {
    /*
    This function will build out the moveTree by:
    Getting the pieces for next colored side.
    Creating copies of board for each valid move.
    Making those board copies children of the parent board.
    */

    // Only fill out children if there are none
    // Avoid creating duplicates
    if (parent.children === undefined) return;
    if (parent.children.length === 0) {
      // Get all the pieces that can move.
      let piecesThatCanMove;
      const {wPieces, bPieces} = parent.getPieces();
      if (turnCol === 'w') {
        piecesThatCanMove = wPieces;
      } else if (turnCol === 'b') {
        piecesThatCanMove = bPieces;
      }

      // If no pieces for this turn
      // Skip turn with same board
      if (piecesThatCanMove.length === 0) {
        const newDepth = currDepth + 1;
        if (newDepth < maxDepth) {
          buildMoveTree(parent, nextTurn[turnCol], newDepth, maxDepth);
        }
      }

      // For each piece
      // And for each valid move
      // Copy the board after the move
      // And make it a child of the parent board
      piecesThatCanMove.forEach((piece) => {
        const validMoves = piece.getValidMoves(parent);
        validMoves.forEach((validMove) => {
          const childBoard = parent.copyBoard();
          const [startX, startY] = piece.position;
          const {endPosX, endPosY} = validMove;
          childBoard.removePiece(startX, startY);
          childBoard.addPiece(endPosX, endPosY, piece.color, piece.pieceType);
          parent.children.push(childBoard);

          // Recursively fill out the move tree
          // Set current board as the parent
          // Increase the depth
          // Only keep going if the currDepth is less than maxDepth
          const newDepth = currDepth + 1;
          if (newDepth < maxDepth) {
            buildMoveTree(childBoard, nextTurn[turnCol], newDepth, maxDepth);
          }
        });
      });
    }
  }

  /**
   * Returns all the leaves / boards with no children,
   * along with the board leading to them.
   * @param {Object} tree - parent/root to traverse down children and get leaves
   * @param {Object} boardLeadingToLeaf - undefined or the board leading to leaf
   * @return {Array} all leaves returned as board object
   * with boards 'leaf' and 'boardLeadingToLeaf'
   */
  function getLeaves(tree) {
    // return leaves or empty array
    const leaves = [];

    // if no tree, no leaves
    if (!tree) return leaves;

    /**
     * Adds children of tree to leaves array.
     * @param {Object} currChild - child board of tree
     */
    function helper(currChild) {
      if (currChild.children.length === 0) {
        leaves.push({'leaf': currChild, 'boardLeadingToLeaf': tree});
      } else {
        currChild.children.forEach((nextChild) => {
          helper(nextChild);
        });
      }
    }

    helper(tree);

    return leaves;
  }

  /**
   * Returns the next move/board from moveTree which leads to the best
   * score.
   * @param {*} tree
   * @param {*} color
   * @return {Object} board with best move
   */
  function findBestMoveBoard(tree, color) {
    const scoreToCheck = color === 'w' ? 'wScore' : 'bScore';
    // Before checking leaves, check for checkmates on next turn
    // to catch first turn checkmates etc.
    if (tree && tree.children) {
      for (let index = 0; index < tree.children.length; index++) {
        const childBoard = tree.children[index];
        const kingColorToCheck = color === 'w' ? 'b' : 'w';
        const isOpponentKingInCheckmate =
          childBoard.isInCheckmate(kingColorToCheck);
        if (isOpponentKingInCheckmate) {
          return childBoard;
        }
      }
    }
    // Now check leaves for best score and return board leading to that leaf
    // as the best board.
    const leaves = this.getLeaves(tree);
    // console.log('Got leaves of tree: ');
    // console.log(leaves.length);
    // console.log(leaves[0]);
    let bestLeafScore = -Infinity;
    let bestLeaf;
    leaves.forEach((l) => {
      const {leaf} = l;
      if (leaf[scoreToCheck] > bestLeafScore) {
        bestLeafScore = leaf[scoreToCheck];
        bestLeaf = l;
      }
    });

    if (bestLeaf === undefined) {
      return tree;
    }

    const {boardLeadingToLeaf} = bestLeaf;
    return boardLeadingToLeaf;
  }

  /**
   * Plays the best moves from moveTree.
   * @param {Object} parent - starting board
   * @param {String} turnColor - 'w' or 'b'
   * @param {Number} maxMoves - Limit to number of moves
   */
  function playBestMovesRecursive(
      parent,
      turnColor = 'w',
      maxMoves = 20) {
    // Stop at maxMoves
    if (maxMoves === 0) {
      console.log('Max moves reached.');
      return;
    }
    maxMoves--;

    // Find the best board for color turn
    const bestMoveBoard = parent.bestMoveBoard;
    if (bestMoveBoard) {
      if (bestMoveBoard['wScore'] === Infinity) {
        console.log('w turn, b checkmated');
        bestMoveBoard.printBoard();
        return;
      } else if (bestMoveBoard['bScore'] === Infinity) {
        console.log('b turn, w checkmated');
        bestMoveBoard.printBoard();
        return;
      }

      // Print board
      console.log(`${turnColor} turn, Board updated: `);
      bestMoveBoard.printBoard();

      // Delete children and bestMoveBoard and start fresh with new moves
      const savedBoard = bestMoveBoard;
      // delete parent;
      parent = {};
      savedBoard.children = [];
      savedBoard['bestMoveBoard'] = {};
      this.buildMoveTree(savedBoard, this.nextTurn[turnColor], 0, 4);
      this.buildBestMoves(savedBoard, this.nextTurn[turnColor]);

      // Call recursively
      this.playBestMovesRecursive(
          savedBoard,
          this.nextTurn[turnColor],
          maxMoves);
    }
  }

  return {
    nextTurn,
    buildBestMoves,
    buildMoveTree,
    findBestMoveBoard,
    getLeaves,
    playBestMovesRecursive,
  };
}

module.exports = {
  createSolver,
};
