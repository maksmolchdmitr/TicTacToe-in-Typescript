var board;
var currentPlayer;
var gameOver;
var gameMode;
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
var gameStatusElement = document.getElementById('game-status');
// Обновить текст состояния игры
function updateGameStatus(message) {
    gameStatusElement.textContent = message;
}
function renderBoard() {
    console.log('Render board');
    var boardElement = document.querySelector('.board');
    boardElement.innerHTML = '';
    var _loop_1 = function (i) {
        var _loop_2 = function (j) {
            var cell = document.createElement('div');
            cell.classList.add('cell');
            if (board[i][j] != '') {
                cell.classList.add(board[i][j] === 'X' ? 'cross' : 'circle');
            }
            if (gameOver) {
                cell.classList.add('disabled');
            }
            else {
                cell.classList.remove('disabled');
            }
            cell.addEventListener('click', function () { return handleCellClick(i, j); });
            boardElement.appendChild(cell);
        };
        for (var j = 0; j < 3; j++) {
            _loop_2(j);
        }
    };
    for (var i = 0; i < 3; i++) {
        _loop_1(i);
    }
}
function handleCellClick(row, col) {
    console.log('Handle cell click');
    console.log('gameOver=', gameOver);
    if (gameOver || board[row][col] !== '') {
        return;
    }
    board[row][col] = currentPlayer;
    renderBoard();
    if (checkWin(currentPlayer)) {
        updateGameStatus("\u0418\u0433\u0440\u043E\u043A ".concat(currentPlayer, " \u0432\u044B\u0438\u0433\u0440\u0430\u043B!"));
        gameOver = true;
    }
    else if (checkDraw()) {
        updateGameStatus('Ничья!');
        gameOver = true;
    }
    else {
        switchGameMode();
    }
    renderBoard();
}
function checkWin(player) {
    console.log('check win');
    // Проверяем горизонтальные, вертикальные и диагональные линии
    for (var i = 0; i < 3; i++) {
        if (board[i][0] === player &&
            board[i][1] === player &&
            board[i][2] === player) {
            return true;
        }
        if (board[0][i] === player &&
            board[1][i] === player &&
            board[2][i] === player) {
            return true;
        }
    }
    if (board[0][0] === player &&
        board[1][1] === player &&
        board[2][2] === player) {
        return true;
    }
    if (board[0][2] === player &&
        board[1][1] === player &&
        board[2][0] === player) {
        return true;
    }
    return false;
}
function checkDraw() {
    console.log('checkDraw');
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
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
    }
    else if (gameMode === 'ai-player') {
        makeAIMove();
    }
}
function makeAIMove() {
    console.log('makeAIMove');
    var row, col;
    do {
        row = Math.floor(Math.random() * 3);
        col = Math.floor(Math.random() * 3);
    } while (board[row][col] !== '');
    var computerPlayer = currentPlayer === 'X' ? 'O' : 'X';
    board[row][col] = computerPlayer;
    renderBoard();
    if (checkWin(computerPlayer)) {
        updateGameStatus("\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440 \u0432\u044B\u0438\u0433\u0440\u0430\u043B!");
        gameOver = true;
    }
    else if (checkDraw()) {
        updateGameStatus('Ничья!');
        gameOver = true;
    }
}
var resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click', function () {
    initGame();
});
var gameModeRadios = document.querySelectorAll('input[name="game-mode"]');
gameModeRadios.forEach(function (radio) {
    radio.addEventListener('change', function () {
        gameMode = radio.value;
        initGame();
    });
});
initGame();
gameMode = 'two-player';
