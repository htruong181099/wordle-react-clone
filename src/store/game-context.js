import React from 'react';

const TILE = {
  data: '',
  status: null,
};

const GameContext = React.createContext({
  rowIndex: 0,
  tileIndex: 0,
  board: [
    [TILE, TILE, TILE, TILE, TILE],
    [TILE, TILE, TILE, TILE, TILE],
    [TILE, TILE, TILE, TILE, TILE],
    [TILE, TILE, TILE, TILE, TILE],
    [TILE, TILE, TILE, TILE, TILE],
    [TILE, TILE, TILE, TILE, TILE],
  ],
  addLetter: (letter) => {},
  deleteLetter: () => {},
  checkRow: () => {},
  message: '',
  isGameOver: false,
  keyGuessed: {},
});

export default GameContext;
