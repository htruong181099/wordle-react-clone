import React, { useState, Suspense } from 'react';
import './App.css';
import Board from './components/Board/Board';
import Header from './components/Header';
import Keyboard from './components/Keyboard/Keyboard';
import GameContextProvider from './store/GameContextProvider';

import LoadingModal from './components/Layout/LoadingModal';
const ResultModal = React.lazy(() => import('./components/Layout/ResultModal'));
const HowToPlay = React.lazy(() => import('./components/Layout/HowToPlay'));

function App() {
	const [helpDisplay, setHelpDisplay] = useState(false);
	const [resultDisplay, setResultDisplay] = useState(true);

	const displayHelpHandler = () => {
		setHelpDisplay((prevHelpDisplay) => !prevHelpDisplay);
	};

	const displayResultHandler = (e, reset = false) => {
		if (reset && resultDisplay) {
			console.log(reset, resultDisplay);
			return;
		}
		setResultDisplay((prevResultDisplay) => !prevResultDisplay);
	};

	return (
		<GameContextProvider>
			<Suspense fallback={<LoadingModal />}>
				<div className="game-container">
					<Header
						onDisplayHelp={displayHelpHandler}
						onDisplayResult={displayResultHandler}
					/>
					{helpDisplay && <HowToPlay onClose={displayHelpHandler} />}
					{resultDisplay && <ResultModal onClose={displayResultHandler} />}
					<LoadingModal />
					<Board />
					<Keyboard />
				</div>
			</Suspense>
		</GameContextProvider>
	);
}

export default App;
