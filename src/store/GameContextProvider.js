import { useReducer } from 'react';
import GameContext from './game-context';

const TILE = {
  data: '',
  status: null,
};

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
      staus: null,
    };
    const newTileIndex = state.tileIndex + 1;

    return {
      rowIndex: state.rowIndex,
      tileIndex: newTileIndex,
      board: newBoard,
    };
  }
  if (action.type === 'DEL') {
    if (state.tileIndex === 0) {
      return {
        rowIndex: state.rowIndex,
        tileIndex: state.tileIndex,
        board: state.board,
      };
    }
    const newBoard = [...state.board];
    const newTileIndex = state.tileIndex - 1;
    newBoard[state.rowIndex][newTileIndex] = '';

    return {
      rowIndex: state.rowIndex,
      tileIndex: newTileIndex,
      board: newBoard,
    };
  }
  if (action.type === 'ENTER') {
    let checkWordle = WORDLE.split('');
    //invalid enter
    if (state.tileIndex !== 5) {
      return {
        rowIndex: state.rowIndex,
        tileIndex: state.tileIndex,
        board: state.board,
      };
    }

    const rowTiles = state.board[state.rowIndex];

    rowTiles.forEach((tile, index) => {
      tile.status = 'absent';
      if (tile.data === checkWordle[index]) {
        tile.status = 'correct';
        checkWordle[index] = '';
      }
    });

    rowTiles.forEach((tile) => {
      let index = checkWordle.indexOf(tile.data);
      if (index !== -1 && tile.status !== 'correct') {
        tile.status = 'present';
        checkWordle[index] = '';
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
      };
    }

    //Losing
    if (state.rowIndex === 5) {
      return {
        ...state,
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
  };

  return (
    <GameContext.Provider value={gameContext}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
