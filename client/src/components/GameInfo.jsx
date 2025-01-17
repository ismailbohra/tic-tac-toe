import React from 'react';

const GameInfo = ({ player, opponent, turn }) => {
  return (
    <div>
      <h3>Player: {player}</h3>
      <h3>Opponent: {opponent}</h3>
      <h3>Turn: {turn}</h3>
    </div>
  );
};

export default GameInfo;
