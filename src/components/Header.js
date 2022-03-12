import { useContext } from 'react';
import classes from './Header.module.css';
import GameContext from '../store/game-context';
import { fetchWORDLE } from '../store/GameContextProvider';

const Header = (props) => {
	const gameContext = useContext(GameContext);
	const { resetGame, setIsLoading } = gameContext;

	const helpDisplayHandler = () => {
		props.onDisplayHelp();
	};

	const resetHandler = () => {
		setIsLoading(true);
		fetchWORDLE(resetGame, setIsLoading);
		props.onDisplayResult(true);
	};

	return (
		<header className={classes.header}>
			<div className={classes['left-menu']}>
				<button
					id="help-button"
					className={classes.icon}
					aria-label="Help"
					tabIndex="-1"
					onClick={helpDisplayHandler}
				>
					<game-icon icon="help">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 0 24 24"
							width="24"
						>
							<path
								fill="var(--color-tone-1)"
								d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
							></path>
						</svg>
					</game-icon>
				</button>
			</div>
			<div className={classes.logo}>Wordle</div>
			<div className={classes['right-menu']} onClick={resetHandler}>
				<button
					id="statistics-button"
					className={classes.icon}
					aria-label="Statistics"
					tabIndex="-1"
				>
					<game-icon icon="statistics">
						<img
							src="https://img.icons8.com/ios-filled/50/000000/recurring-appointment.png"
							width="20px"
							height="20px"
							alt="reset"
						/>
					</game-icon>
				</button>
			</div>
		</header>
	);
};

export default Header;
