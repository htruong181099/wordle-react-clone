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
    <button id={props.id} onClick={handleClick}>
      {props.children}
    </button>
  );
};

export default KeyElement;
