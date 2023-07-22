// Variables to keep track of the game state
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

// Function to make a move when a cell is clicked
function makeMove(index) {
  if (board[index] === "" && !gameOver) {
    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].textContent = currentPlayer;
    if (checkWinner()) {
      gameOver = true;
      alert(currentPlayer + " wins!");
    } else if (checkDraw()) {
      gameOver = true;
      alert("It's a draw!");
    } else {
      togglePlayer();
      if (currentPlayer === "O") {
        // AI player's turn
        let bestMove = findBestMove();
        makeMove(bestMove);
      }
    }
  }
}

// Function to toggle between 'X' and 'O'
function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Function to check for a winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];
  //ngecek apakah di setiap bords dari winningcombn itu isinya sama
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true; // We have a winner
    }
  }

  return false; // No winner yet
}

// Function to check for a draw
function checkDraw() {
  return board.every((cell) => cell !== ""); // Check if all cells are filled
}

// Function to find the best move for AI using the minimax algorithm
function findBestMove() {
  let bestScore = -Infinity;
  let bestMove;

  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "O"; // Try a move
      let score = minimax(board, 0, false); // Get the score for this move
      board[i] = ""; // Undo the move

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

// Minimax algorithm for AI decision making
function minimax(board, depth, isMaximizing) {
  if (checkWinner()) {
    return isMaximizing ? -10 + depth : 10 - depth;
  } else if (checkDraw()) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(bestScore, score);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "X";
        let score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(bestScore, score);
      }
    }
    return bestScore;
  }
}
// jika tombol ty again ke click
document.querySelector("#btnMain").addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];

  for (let i = 0; i < 9; i++) {
    document.getElementsByClassName("cell")[i].textContent = "";
  }
  gameOver = false;
  currentPlayer = "X";
});
