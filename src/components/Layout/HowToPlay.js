import GuessRow from '../Board/GuessRow';
import Modal from '../UI/Modal';

import classes from './HowToPlay.module.css';

const CORRECT_EXAMPLES = [
  {
    data: 'W',
    status: 'correct',
  },
  {
    data: 'E',
    status: null,
  },
  {
    data: 'A',
    status: null,
  },
  {
    data: 'R',
    status: null,
  },
  {
    data: 'Y',
    status: null,
  },
];
const PRESENT_EXAMPLES = [
  {
    data: 'P',
    status: null,
  },
  {
    data: 'I',
    status: 'present',
  },
  {
    data: 'L',
    status: null,
  },
  {
    data: 'L',
    status: null,
  },
  {
    data: 'S',
    status: null,
  },
];
const ABSENT_EXAMPLES = [
  {
    data: 'V',
    status: null,
  },
  {
    data: 'A',
    status: null,
  },
  {
    data: 'G',
    status: null,
  },
  {
    data: 'U',
    status: null,
  },
  {
    data: 'E',
    status: null,
  },
];

const HowToPlay = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <div className={classes.container}>
        <header>
          <span onClick={props.onClose} className={classes.exit}>
            X
          </span>
          <h3>HOW TO PLAY</h3>
        </header>
        <div className={classes.instructions}>
          <p>
            Guess the <strong>WORDLE</strong> in six tries.
          </p>
          <p>
            Each guess must be a valid five-letter word. Hit the enter button to
            submit.
          </p>
          <p>
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </p>
        </div>
        <div className={classes.examples}>
          <h4>Examples</h4>
          <div className={classes.example}>
            <GuessRow data={CORRECT_EXAMPLES} />
            <p>
              The letter <strong>W</strong> is in the word and in the correct
              spot.
            </p>
          </div>
          <div className={classes.example}>
            <GuessRow data={PRESENT_EXAMPLES} />
            <p>
              The letter <strong>I</strong> is in the word but in the wrong
              spot.
            </p>
          </div>
          <div className={classes.example}>
            <GuessRow data={ABSENT_EXAMPLES} />
            <p>
              The letter <strong>U</strong> is not in the word in any spot.
            </p>
          </div>
        </div>
        <footer>
          <strong>A new WORDLE will be available each day!</strong>
        </footer>
      </div>
    </Modal>
  );
};

export default HowToPlay;
