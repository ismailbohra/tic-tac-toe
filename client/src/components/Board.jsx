// src/components/Board.js
import React from 'react';

const Board = ({ board, onClick, winner }) => {
  const renderSquare = (index) => {
    return (
      <button
        className="square"
        onClick={() => onClick(index)}
        disabled={board[index] !== null || winner}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className="board">
      {board.map((_, index) => (
        <div key={index} className="square-container">
          {renderSquare(index)}
        </div>
      ))}
    </div>
  );
};

export default Board;
