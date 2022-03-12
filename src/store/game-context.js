import React from 'react';

const TILE = {
	data: '',
	status: null,
};

const GameContext = React.createContext({
	WORDLE: '',
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
	resetGame: () => {},
	message: '',
	isGameOver: false,
	isLoading: false,
	keyGuessed: {},
});

export default GameContext;
