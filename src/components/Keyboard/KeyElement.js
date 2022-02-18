import classes from './KeyElement.module.css';

const KeyElement = (props) => {
  const handleClick = (event) => {
    if (event.target.id === 'ENTER') {
      props.onEnter();
    } else if (event.target.id === 'DEL') {
      props.onDelete();
    } else {
      props.onClick(event.target.id);
    }
  };

  return (
    <button
      id={props.id}
      onClick={handleClick}
      className={props.status && classes[props.status]}
    >
      {props.children}
    </button>
  );
};

export default KeyElement;
