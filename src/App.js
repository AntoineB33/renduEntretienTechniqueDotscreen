import React, { useState } from 'react';
import './App.css'; // Import the CSS file

const ConnectFour = () => {
    const [board, setBoard] = useState(Array(6).fill(null).map(() => Array(7).fill(null))); // the board: 6 rows, 7 columns
    const [currentPlayer, setCurrentPlayer] = useState('R'); // R for Red, Y for Yellow; starting with Red
    const [winner, setWinner] = useState(null);
    const [dropping, setDropping] = useState({ column: null, row: null }); // Track dropping state

    const dropPiece = (columnIndex) => {
        if (winner) return;

        const newBoard = board.map(row => row.slice());
        for (let row = 5; row >= 0; row--) {
            if (!newBoard[row][columnIndex]) {
                newBoard[row][columnIndex] = currentPlayer;
                setBoard(newBoard);
                checkWinner(newBoard, currentPlayer);
                setCurrentPlayer(currentPlayer === 'R' ? 'Y' : 'R');
                break;
            }
        }
    };

    const checkWinner = (board, player) => {
        // Check horizontal, vertical, and diagonal for a winner
        const directions = [
            { x: 1, y: 0 }, // horizontal
            { x: 0, y: 1 }, // vertical
            { x: 1, y: 1 }, // diagonal \
            { x: 1, y: -1 } // diagonal /
        ];

        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                if (board[row][col] === player) {
                    for (const { x, y } of directions) {
                        if (checkDirection(board, row, col, x, y, player)) {
                            setWinner(player);
                            return;
                        }
                    }
                }
            }
        }
    };

    const checkDirection = (board, row, col, x, y, player) => {
        let count = 0;
        for (let i = 0; i < 4; i++) {
            const newRow = row + i * y;
            const newCol = col + i * x;
            if (newRow < 0 || newRow >= 6 || newCol < 0 || newCol >= 7 || board[newRow][newCol] !== player) {
                break;
            }
            count++;
        }
        return count === 4;
    };

    const resetGame = () => {
        setBoard(Array(6).fill(null).map(() => Array(7).fill(null)));
        setCurrentPlayer('R');
        setWinner(null);
    };

    return (
        <div className="connect-four">
            <h1>Connect 4</h1>
            <div className="board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <div
                                key={colIndex}
                                className={`cell ${cell}`}
                                onClick={() => dropPiece(colIndex)}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className="status">
                {!winner && <div className="current-player">
                    <h2>Current Player:</h2>
                    <div className={`which-player ${currentPlayer}`}>
                        <div className={`player-circle ${currentPlayer}`}></div>
                        {currentPlayer === 'R' ? 'PLAYER 1' : 'PLAYER 2'}
                    </div>
                  </div>}
                {winner && <div className="winner">
                    <h1>Winner:</h1>
                    <div className={`which-player ${currentPlayer}`}>
                        <div className={`player-circle ${winner}`}></div>
                        {winner === 'R' ? 'PLAYER 1' : 'PLAYER 2'}
                    </div>
                    <button className="reset-button" onClick={resetGame}>Reset Game</button>
                  </div>}
            </div>
        </div>
    );
};

export default ConnectFour;
