import { useContext } from 'react';
import GameContext from '../../store/game-context';
import Modal from '../UI/Modal';

import classes from './ResultModal.module.css';

const ResultModal = (props) => {
	const gameContext = useContext(GameContext);
	const { isGameOver, message, isLoading } = gameContext;

	return isGameOver && !isLoading ? (
		<Modal onClose={props.onClose}>
			<div className={classes.container}>
				<header>
					<h2>{message}</h2>
					<span onClick={props.onClose} className={classes.exit}>
						X
					</span>
				</header>
			</div>
		</Modal>
	) : null;
};

export default ResultModal;
