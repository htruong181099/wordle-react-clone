import KeyElement from './KeyElement';
import classes from './Keyboard.module.css';
import { useContext } from 'react';
import GameContext from '../../store/game-context';

const Keyboard = (props) => {
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
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    'DEL',
  ];

  const gameContext = useContext(GameContext);
  const keyAddHandler = (letter) => {
    gameContext.addLetter(letter);
  };

  const keyDeleteHandler = () => {
    gameContext.deleteLetter();
  };

  const rowCheckHandler = () => {
    gameContext.checkRow();
  };

  const keyDownHandler = (event) => {
    event.target.focus();
    const key = event.key;
    if (!KEYS.includes(key.toUpperCase())) {
      return;
    }
    if (key === 'Enter') {
      console.log(key);
    } else if (key === 'Backspace') {
      console.log(key);
    } else {
      console.log(key);
    }
  };

  const keys = KEYS.map((key) => {
    return (
      <KeyElement
        id={key}
        key={key}
        onClick={keyAddHandler}
        onDelete={keyDeleteHandler}
        onEnter={rowCheckHandler}
      >
        {key}
      </KeyElement>
    );
  });

  return (
    <div
      className={classes['keyboard-container']}
      onKeyDown={keyDownHandler}
      tabIndex={0}
    >
      {keys}
    </div>
  );
};

export default Keyboard;
