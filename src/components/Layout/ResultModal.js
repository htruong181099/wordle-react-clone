import { useContext } from 'react';
import GameContext from '../../store/game-context';
import Modal from '../UI/Modal';

const ResultModal = (props) => {
  const gameContext = useContext(GameContext);
  const { isGameOver, message } = gameContext;

  return isGameOver ? (
    <Modal onClose={props.onClose}>
      <h2>{message}</h2>
      <button>Share</button>
    </Modal>
  ) : null;
};

export default ResultModal;
