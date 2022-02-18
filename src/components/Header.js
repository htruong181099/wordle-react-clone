import classes from './Header.module.css';

const Header = (props) => {
  const helpDisplayHandler = () => {
    props.onDisplayHelp();
  };

  const statDisplayHandler = () => {
    props.onDisplayStat();
  };

  return (
    <header className={classes.header}>
      <div className={classes['left-menu']}>
        <button aria-label="Help" onClick={helpDisplayHandler}>
          Help
        </button>
      </div>
      <div className={classes.logo}>Wordle</div>
      <div className={classes['right-menu']} onClick={statDisplayHandler}>
        Stat
      </div>
    </header>
  );
};

export default Header;
