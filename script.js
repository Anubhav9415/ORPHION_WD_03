const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const xScoreEl = document.getElementById('x-score');
const oScoreEl = document.getElementById('o-score');
const drawsEl = document.getElementById('draws');
const newGameBtn = document.getElementById('new-game');
const resetScoresBtn = document.getElementById('reset-scores');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;
let scores = { x: 0, o: 0, draws: 0 };

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  boardEl.innerHTML = '';
  board.forEach((_, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    boardEl.appendChild(cell);
  });
  updateStatus();
}

function updateBoard() {
  document.querySelectorAll('.cell').forEach((cell, i) => {
    const val = board[i];
    cell.textContent = val || '';
    cell.classList.remove('x', 'o', 'winner');
    if (val) cell.classList.add(val.toLowerCase());
  });
}

function updateStatus(message = null) {
  if (message) {
    statusEl.textContent = message;
    return;
  }

  if (!gameActive) return;

  if (currentPlayer === 'X') {
    statusEl.textContent = "Your turn (X)";
    statusEl.className = 'status player-x';
  } else {
    statusEl.textContent = "AI is thinking... (O)";
    statusEl.className = 'status player-o';
  }
}

function checkWinner(tempBoard = board) {
  for (let [a, b, c] of winningCombos) {
    if (tempBoard[a] && tempBoard[a] === tempBoard[b] && tempBoard[a] === tempBoard[c]) {
      return tempBoard[a];
    }
  }
  return null;
}

function isDraw() {
  return board.every(cell => cell !== null);
}

function handleClick(e) {
  const idx = Number(e.target.dataset.index);
  if (!gameActive || board[idx] !== null || currentPlayer !== 'X') return;

  board[idx] = 'X';
  updateBoard();

  const winner = checkWinner();
  if (winner) {
    endGame(winner);
    return;
  }
  if (isDraw()) {
    endGame('draw');
    return;
  }

  currentPlayer = 'O';
  updateStatus();

  setTimeout(aiMove, 400);
}

function endGame(result) {
  gameActive = false;

  if (result === 'X') {
    scores.x++;
    statusEl.textContent = "You win! 🎉";
    statusEl.className = 'status win';
  } else if (result === 'O') {
    scores.o++;
    statusEl.textContent = "AI wins 😔";
    statusEl.className = 'status win';
  } else {
    scores.draws++;
    statusEl.textContent = "Draw";
    statusEl.className = 'status draw';
  }

  xScoreEl.textContent = scores.x;
  oScoreEl.textContent = scores.o;
  drawsEl.textContent = scores.draws;

  // Highlight winning line
  if (result !== 'draw') {
    for (let combo of winningCombos) {
      const [a,b,c] = combo;
      if (board[a] === result && board[a] === board[b] && board[a] === board[c]) {
        [a,b,c].forEach(i => {
          document.querySelector(`[data-index="${i}"]`).classList.add('winner');
        });
        break;
      }
    }
  }
}

function aiMove() {
  if (!gameActive) return;

  const best = minimax(board, 'O').index;
  board[best] = 'O';
  updateBoard();

  const winner = checkWinner();
  if (winner) {
    endGame(winner);
    return;
  }
  if (isDraw()) {
    endGame('draw');
    return;
  }

  currentPlayer = 'X';
  updateStatus();
}

function minimax(newBoard, player) {
  const avail = newBoard.reduce((acc, val, i) => val === null ? acc.concat(i) : acc, []);

  if (checkWinner(newBoard) === 'X') return { score: -10 };
  if (checkWinner(newBoard) === 'O') return { score: 10 };
  if (avail.length === 0) return { score: 0 };

  const moves = [];

  for (let idx of avail) {
    const move = { index: idx };
    newBoard[idx] = player;

    if (player === 'O') {
      const result = minimax(newBoard, 'X');
      move.score = result.score;
    } else {
      const result = minimax(newBoard, 'O');
      move.score = result.score;
    }

    newBoard[idx] = null;
    moves.push(move);
  }

  let bestMove;
  if (player === 'O') {
    let bestScore = -Infinity;
    for (let move of moves) {
      if (move.score > bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let move of moves) {
      if (move.score < bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    }
  }

  return bestMove;
}

// Controls
newGameBtn.addEventListener('click', () => {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  createBoard();
  updateBoard();
  updateStatus();
});

resetScoresBtn.addEventListener('click', () => {
  scores = { x: 0, o: 0, draws: 0 };
  xScoreEl.textContent = 0;
  oScoreEl.textContent = 0;
  drawsEl.textContent = 0;
});

// Start
createBoard();