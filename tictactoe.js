// app.js
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');

    let currentPlayer = 'X';
    let boardState = Array(9).fill(null);

    const createSquare = (index) => {
        const square = document.createElement('div');
        square.className = 'square';
        square.addEventListener('click', () => handleSquareClick(index));
        return square;
    };

    const handleSquareClick = (index) => {
        if (boardState[index] || checkWinner()) return;

        boardState[index] = currentPlayer;
        updateBoard();
        if (checkWinner()) {
            status.textContent = `Winner: ${currentPlayer}`;
        } else if (boardState.every(cell => cell)) {
            status.textContent = 'Draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Next player: ${currentPlayer}`;
        }
    };

    const updateBoard = () => {
        boardState.forEach((value, index) => {
            const square = board.children[index];
            square.textContent = value;
        });
    };

    const checkWinner = () => {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return true;
            }
        }
        return false;
    };

    const resetGame = () => {
        boardState.fill(null);
        currentPlayer = 'X';
        status.textContent = `Next player: ${currentPlayer}`;
        updateBoard();
    };

    // Initialize board
    for (let i = 0; i < 9; i++) {
        board.appendChild(createSquare(i));
    }

    resetButton.addEventListener('click', resetGame);
});
