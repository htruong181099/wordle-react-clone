import { useContext } from 'react';
import GameContext from '../../store/game-context';
import Modal from '../UI/Modal';

import classes from './ResultModal.module.css';

const LoadingModal = (props) => {
	const gameContext = useContext(GameContext);
	const { isLoading } = gameContext;

	return isLoading ? (
		<Modal onClose={props.onClose}>
			<div className={classes.container}>
				<h1>Loading...</h1>
			</div>
		</Modal>
	) : null;
};

export default LoadingModal;
