import GuessRow from './GuessRow';

import classes from './Board.module.css';
import { useContext } from 'react';
import GameContext from '../../store/game-context';

const Board = (props) => {
	const gameCtx = useContext(GameContext);
	const guessRows = gameCtx.board;

	const rows = guessRows.map((row, index) => {
		return <GuessRow key={index} id={`row-${index}`} data={row}></GuessRow>;
	});

	return <div className={classes['board-container']}>{rows}</div>;
};

export default Board;
