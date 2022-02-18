import { useContext, useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board/Board';
import Header from './components/Header';
import Keyboard from './components/Keyboard/Keyboard';
import ResultModal from './components/ResultModal';
import GameContext from './store/game-context';
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
        {helpDisplay && <p>Help</p>}
        {statDisplay && <p>Stat</p>}

        {resultDisplay && <ResultModal onClose={displayResultHandler} />}

        <Board />
        <Keyboard />
      </div>
    </GameContextProvider>
  );
}

export default App;
