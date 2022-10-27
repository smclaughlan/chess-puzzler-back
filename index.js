const { createBoard } = require("./createBoard");
const { createSolver } = require("./createSolver");
const { randNum } = require("./randNum");
const express = require("express");
const app = express();
const fs = require("fs");
// eslint-disable-next-line new-cap
// const router = express.Router();
const cors = require("cors");

app.use(express.json());
app.use(cors());

let puzzleBoards = [];

// load boards
fs.readFile("./storedBoards.json", "utf8", (err, data) => {
  if (err) {
    console.log("Error reading file from disk: ", err);
  } else {
    puzzleBoards = JSON.parse(data);
    console.log(
      "puzzleBoards length: ",
      puzzleBoards.length
    );
  }
});

/**
 * Returns a random puzzle board from the array.
 * @return {Object} puzzle board
 */
function getRandomPuzzleBoard() {
  return puzzleBoards[randNum(0, puzzleBoards.length - 1)];
}

app.get("/", (req, res) => {
  res.send({ brd: getRandomPuzzleBoard() });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.post("/move", async (req, res) => {
  const boardJson = req.body;
  const newBoard = createBoard();
  const boardWithPieces = boardJson.board;
  // Iterate over all positions and add pieces to newBoard
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const posOrPiece = boardWithPieces[x][y];
      if (posOrPiece !== "____") {
        newBoard.addPiece(
          x,
          y,
          posOrPiece.color,
          posOrPiece.pieceType
        );
      }
    }
  }

  const puzzleSolver = createSolver(newBoard);
  puzzleSolver.buildMoveTree(newBoard, "b", 0, 3);
  puzzleSolver.buildBestMoves(newBoard, "b");
  let moveReply;
  if (!newBoard.bestMoveBoard) {
    // There's no bestMoveBoard because black cannot move
    // If it's checkmate, {checkmated: 'b'}
    // else, {stalemate: true}
    if (newBoard.isInCheckmate("b")) {
      moveReply = { checkmated: "b" };
    } else if (newBoard.isInCheckmate("w")) {
      moveReply = { checkmated: "w" };
    } else {
      moveReply = { stalemate: true };
    }
  } else {
    moveReply = { move: newBoard.bestMoveBoard };
  }

  res.json(moveReply);
});

module.exports = app;
