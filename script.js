// Variablesd
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

// Function basic saat event click on object
function makeMove(index) {
  if (board[index] === "" && !gameOver) {
    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].textContent = currentPlayer;
    if (checkWinner()) {
      gameOver = true;
      if (currentPlayer === "O") {
        Swal.fire({
          title: `You Lose ${currentPlayer} win`,
          icon: `error`,
          text: `Lets try again`,
        });
      } else {
        Swal.fire({
          title: `Good Game! You win`,
          icon: `succes`,
          text: `Lets Play again`,
        });
      }
    } else if (checkDraw()) {
      gameOver = true;
      Swal.fire({
        title: `Nice Try,`,
        icon: `info`,
        text: `Lets Play again, Until You win`,
      });
    } else {
      togglePlayer();
      if (currentPlayer === "O") {
        // Comp Turn Change
        let bestMove = findBestMove();
        makeMove(bestMove);
      }
    }
  }
}

// toggle between 'X' and 'O'
function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

//  for a winner
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
      return true;
    }
  }

  return false;
}

// Function to check for a draw
function checkDraw() {
  return board.every((cell) => cell !== "");
}

// Function AI using the minimax algorithm
function findBestMove() {
  let bestScore = -Infinity;
  let bestMove;

  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "O";
      let score = minimax(board, 0, false);
      board[i] = "";

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

// Minimax algorithm
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

// function untuk toast
// var toast = document.getElementById("liveToast");
// var bsToast = new bootstrap.Toast(toast);

// function alertToast(menang, currentPlayer) {
//   // Get the toast element
//   let toastBody = document.getElementById("badannya");
//   if (menang) {
//     toastBody.innerText = `${currentPlayer} Is a Winner`;
//   } else {
//     toastBody.innerText = "It's a draw";
//   }
//   bsToast.show();
// }
