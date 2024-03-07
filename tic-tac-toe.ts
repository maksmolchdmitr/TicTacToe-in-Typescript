let board: string[][];
let currentPlayer: string;
let gameOver: boolean;
let gameMode: string;

function initGame() {
  console.log('Init game');
  updateGameStatus("Start game!");
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  currentPlayer = 'X';
  gameOver = false;
  renderBoard();
}

// Получить элемент состояния игры
const gameStatusElement = document.getElementById('game-status') as HTMLElement;

// Обновить текст состояния игры
function updateGameStatus(message: string) {
  gameStatusElement.textContent = message;
}

function renderBoard() {
  console.log('Render board');
  const boardElement = document.querySelector('.board');
  boardElement.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell'); 

      if(board[i][j]!=''){
        cell.classList.add(board[i][j] === 'X' ? 'cross' : 'circle');
      }

      if (gameOver) {
        cell.classList.add('disabled');
      } else {
        cell.classList.remove('disabled');
      }

      cell.addEventListener('click', () => handleCellClick(i, j));
      boardElement.appendChild(cell);
    }
  }
}

function handleCellClick(row: number, col: number) {
  console.log('Handle cell click');
  console.log('gameOver=', gameOver);
  if (gameOver || board[row][col] !== '') {
    return;
  }

  board[row][col] = currentPlayer;
  renderBoard();

  if (checkWin(currentPlayer)) {
    updateGameStatus(`Игрок ${currentPlayer} выиграл!`);
    gameOver = true;
  } else if (checkDraw()) {
    updateGameStatus('Ничья!');
    gameOver = true;
  } else {
    switchGameMode();
  }
  renderBoard();
}

function checkWin(player: string) {
  console.log('check win');
  // Проверяем горизонтальные, вертикальные и диагональные линии
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    ) {
      return true;
    }
    if (
      board[0][i] === player &&
      board[1][i] === player &&
      board[2][i] === player
    ) {
      return true;
    }
  }
  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  ) {
    return true;
  }
  if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  ) {
    return true;
  }
  return false;
}

function checkDraw() {
  console.log('checkDraw');
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        return false;
      }
    }
  }
  return true;
}

function switchGameMode() {
  console.log('switchGameMode');
  if (gameMode === 'two-player') {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  } else if (gameMode === 'ai-player') {
    makeAIMove();
  }
}

function makeAIMove() {
  console.log('makeAIMove');
  let row, col;
  do {
    row = Math.floor(Math.random() * 3);
    col = Math.floor(Math.random() * 3);
  } while (board[row][col] !== '');

  let computerPlayer = currentPlayer === 'X' ? 'O' : 'X';

  board[row][col] = computerPlayer;
  renderBoard();

  if (checkWin(computerPlayer)) {
    updateGameStatus(`Компьютер выиграл!`);
    gameOver = true;
  } else if (checkDraw()) {
    updateGameStatus('Ничья!');
    gameOver = true;
  }
}

const resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click', () => {
  initGame();
});

const gameModeRadios = document.querySelectorAll('input[name="game-mode"]');
gameModeRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    gameMode = (radio as HTMLInputElement).value;
    initGame();
  });
});

initGame();
gameMode = 'two-player';