import { useState } from 'react';
import './App.css';
import Board from './components/Board/Board';
import Header from './components/Header';
import Keyboard from './components/Keyboard/Keyboard';

import ResultModal from './components/Layout/ResultModal';
import HowToPlay from './components/Layout/HowToPlay';

import GameContextProvider from './store/GameContextProvider';

function App() {
  const [helpDisplay, setHelpDisplay] = useState(false);
  const [statDisplay, setStatDisplay] = useState(false);
  const [resultDisplay, setResultDisplay] = useState(true);

  const displayHelpHandler = () => {
    setHelpDisplay((prevHelpDisplay) => !prevHelpDisplay);
  };

  const displayStatHandler = () => {
    setStatDisplay((prevStatDisplay) => !prevStatDisplay);
  };

  const displayResultHandler = () => {
    setResultDisplay((prevResultDisplay) => !prevResultDisplay);
  };

  return (
    <GameContextProvider>
      <div className="game-container">
        <Header
          onDisplayHelp={displayHelpHandler}
          onDisplayStat={displayStatHandler}
        />
        {helpDisplay && <HowToPlay onClose={displayHelpHandler} />}
        {statDisplay && <p>Stat</p>}

        {resultDisplay && <ResultModal onClose={displayResultHandler} />}

        <Board />
        <Keyboard />
      </div>
    </GameContextProvider>
  );
}

export default App;
