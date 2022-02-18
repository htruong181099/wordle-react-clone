import { useReducer } from 'react';
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

const WORDLE = 'MEMES';

const defaultGameState = {
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
    let checkWordle = WORDLE.split('');
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
    if (guess === WORDLE) {
      return {
        ...state,
        rowIndex: state.rowIndex,
        tileIndex: state.tileIndex,
        board: state.board,
        message: 'We have a winner!',
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
        message: `<h1>Game over</h1><h2>Today Wordle is ${WORDLE}</h2>`,
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
  return defaultGameState;
};

const GameContextProvider = (props) => {
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

  const gameContext = {
    rowIndex: gameState.rowIndex,
    tileIndex: gameState.tileIndex,
    board: gameState.board,
    isGameOver: gameState.isGameOver,
    message: gameState.message,
    addLetter,
    deleteLetter,
    checkRow,
    keyGuessed: gameState.keyGuessed,
  };

  return (
    <GameContext.Provider value={gameContext}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
