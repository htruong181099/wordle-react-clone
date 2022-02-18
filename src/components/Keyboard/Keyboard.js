import KeyElement from './KeyElement';
import classes from './Keyboard.module.css';
import { useCallback, useContext, useEffect, useState } from 'react';
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
  const { addLetter, deleteLetter, checkRow, keyGuessed } = gameContext;
  const keyAddHandler = useCallback(
    (letter) => {
      addLetter(letter);
    },
    [addLetter]
  );

  const keyDeleteHandler = useCallback(() => {
    deleteLetter();
  }, [deleteLetter]);

  const rowCheckHandler = useCallback(() => {
    checkRow();
  }, [checkRow]);

  //Keyup event handler
  useEffect(() => {
    const listener = (event) => {
      if (event.key === 'Enter') {
        rowCheckHandler();
      } else if (event.key === 'Backspace') {
        keyDeleteHandler();
      } else {
        const key = event.key.toUpperCase();
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          keyAddHandler(key);
        }
      }
    };
    window.addEventListener('keyup', listener);
    return () => {
      window.removeEventListener('keyup', listener);
    };
  }, [keyAddHandler, keyDeleteHandler, rowCheckHandler]);

  const keys = KEYS.map((key) => {
    return (
      <KeyElement
        id={key}
        key={key}
        onClick={keyAddHandler}
        onDelete={keyDeleteHandler}
        onEnter={rowCheckHandler}
        status={keyGuessed[key] ? keyGuessed[key] : ''}
      >
        {key}
      </KeyElement>
    );
  });

  return (
    <div className={classes['keyboard-container']} tabIndex={0}>
      {keys}
    </div>
  );
};

export default Keyboard;
