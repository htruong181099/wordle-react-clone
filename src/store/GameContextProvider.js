import { useEffect, useReducer, useState } from 'react';
import GameContext from './game-context';

const TILE = {
	data: '',
	status: null,
};

const KEYS = [
	'Q',
	'W',
	'E',
	'R',
	'T',
	'Y',
	'U',
	'I',
	'O',
	'P',
	'A',
	'S',
	'D',
	'F',
	'G',
	'H',
	'J',
	'K',
	'L',
	'Z',
	'X',
	'C',
	'V',
	'B',
	'N',
	'M',
];

const keysObj = KEYS.reduce((map, obj) => {
	map[obj] = null;
	return map;
}, {});

const defaultGameState = {
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
	isGameOver: false,
	message: '',
	keyGuessed: keysObj,
};

export const fetchWORDLE = (action, setIsLoading) => {
	fetch(
		'https://random-words5.p.rapidapi.com/getMultipleRandom?count=1&wordLength=5',
		{
			method: 'GET',
			headers: {
				'x-rapidapi-host': 'random-words5.p.rapidapi.com',
				'x-rapidapi-key': '89f57491e9mshb187a374318bf90p13e976jsna7fc0dc001a2',
			},
		}
	)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			// console.log(data);
			action(data);
			setIsLoading(false);
		})
		.catch((err) => {
			console.error(err);
		});
	setTimeout(() => {}, 1000);
};

const gameReducer = (state, action) => {
	if (action.type === 'ADD') {
		if (state.tileIndex === 5) {
			return {
				// rowIndex: state.rowIndex,
				// tileIndex: state.tileIndex,
				...state,
				board: state.board,
			};
		}
		const newBoard = [...state.board];
		newBoard[state.rowIndex][state.tileIndex] = {
			data: action.letter,
			status: null,
		};
		const newTileIndex = state.tileIndex + 1;

		return {
			...state,
			rowIndex: state.rowIndex,
			tileIndex: newTileIndex,
			board: newBoard,
		};
	}

	//delete letter
	if (action.type === 'DEL') {
		if (state.tileIndex === 0) {
			return {
				...state,
			};
		}
		const newBoard = [...state.board];
		const newTileIndex = state.tileIndex - 1;
		newBoard[state.rowIndex][newTileIndex] = '';

		return {
			...state,
			rowIndex: state.rowIndex,
			tileIndex: newTileIndex,
			board: newBoard,
		};
	}

	//check Row
	if (action.type === 'ENTER') {
		let checkWordle = state.WORDLE.split('');
		//invalid enter
		if (state.tileIndex !== 5) {
			return {
				...state,
			};
		}

		const rowTiles = state.board[state.rowIndex];
		const updatedKeyGuessed = { ...state.keyGuessed };

		rowTiles.forEach((tile, index) => {
			tile.status = 'absent';
			if (!['present', 'correct'].includes(updatedKeyGuessed[tile.data])) {
				updatedKeyGuessed[tile.data] = 'absent';
			}
			if (tile.data === checkWordle[index]) {
				tile.status = 'correct';
				updatedKeyGuessed[tile.data] = 'correct';
				checkWordle[index] = '';
			}
		});

		rowTiles.forEach((tile) => {
			let index = checkWordle.indexOf(tile.data);
			if (index !== -1 && tile.status !== 'correct') {
				tile.status = 'present';
				checkWordle[index] = '';
				if (updatedKeyGuessed[tile.data] !== 'correct') {
					updatedKeyGuessed[tile.data] = 'present';
				}
			}
		});

		//Winning
		const guess = state.board[state.rowIndex].map((tile) => tile.data).join('');
		if (guess === state.WORDLE) {
			return {
				...state,
				rowIndex: state.rowIndex,
				tileIndex: state.tileIndex,
				board: state.board,
				message: (
					<div>
						<h2>We have a winner!</h2>
						<h3>Today Wordle is {state.WORDLE}</h3>
					</div>
				),
				isGameOver: true,
				keyGuessed: updatedKeyGuessed,
			};
		}

		//Losing
		if (state.rowIndex === 5) {
			return {
				...state,
				keyGuessed: updatedKeyGuessed,
				isGameOver: true,
				message: (
					<div>
						<h2>Game Over</h2>
						<h3>Today Wordle is {state.WORDLE}</h3>
					</div>
				),
			};
		}

		const newTileIndex = 0;
		const newRowIndex = state.rowIndex + 1;
		return {
			...state,
			rowIndex: newRowIndex,
			tileIndex: newTileIndex,
			board: state.board,
			keyGuessed: updatedKeyGuessed,
		};
	}

	if (action.type === 'NEW') {
		return {
			...state,
			WORDLE: action.data[0].toUpperCase(),
		};
	}

	if (action.type === 'RESET') {
		const newBoard = [
			[TILE, TILE, TILE, TILE, TILE],
			[TILE, TILE, TILE, TILE, TILE],
			[TILE, TILE, TILE, TILE, TILE],
			[TILE, TILE, TILE, TILE, TILE],
			[TILE, TILE, TILE, TILE, TILE],
			[TILE, TILE, TILE, TILE, TILE],
		];
		return {
			...defaultGameState,
			board: [...newBoard],
			isGameOver: false,
			WORDLE: action.data[0].toUpperCase(),
		};
	}

	return { ...defaultGameState };
};

const GameContextProvider = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [gameState, dispatchGameAction] = useReducer(
		gameReducer,
		defaultGameState
	);

	const addLetter = (letter) => {
		dispatchGameAction({
			type: 'ADD',
			letter,
		});
	};
	const deleteLetter = () => {
		dispatchGameAction({
			type: 'DEL',
		});
	};
	const checkRow = () => {
		dispatchGameAction({
			type: 'ENTER',
		});
	};

	const newWORDLE = (data) => {
		dispatchGameAction({
			type: 'NEW',
			data,
		});
	};

	const resetGame = (data) => {
		dispatchGameAction({
			type: 'RESET',
			data,
		});
	};

	useEffect(() => {
		setIsLoading(true);
		fetchWORDLE(newWORDLE, setIsLoading);
	}, []);

	const gameContext = {
		WORDLE: gameState.WORDLE,
		rowIndex: gameState.rowIndex,
		tileIndex: gameState.tileIndex,
		board: gameState.board,
		isGameOver: gameState.isGameOver,
		message: gameState.message,
		keyGuessed: gameState.keyGuessed,
		addLetter,
		deleteLetter,
		checkRow,
		resetGame,
		isLoading,
		setIsLoading,
	};

	return (
		<GameContext.Provider value={gameContext}>
			{props.children}
		</GameContext.Provider>
	);
};

export default GameContextProvider;
