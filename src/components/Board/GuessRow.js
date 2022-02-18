import Tile from './Tile';

const GuessRow = (props) => {
  const tiles = props.data.map((tile, index) => {
    return (
      <Tile
        key={index}
        id={`row-${props.id}-tile-${index}`}
        data={tile.data}
        status={tile.status}
      ></Tile>
    );
  });

  return <div id={props.id}>{tiles}</div>;
};

export default GuessRow;
