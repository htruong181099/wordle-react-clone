import classes from './Tile.module.css';

const Tile = (props) => {
  const tileFlipClass = props.status ? props.status : '';
  return (
    <div
      id={props.id}
      className={`${classes.tile} ${classes[tileFlipClass]}`}
      data={props.data}
    >
      {props.data}
    </div>
  );
};

export default Tile;
