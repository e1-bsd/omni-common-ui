import React from 'react';

const CheckBox = (props) => {
  return <div>
    <input type="checkbox" name={props.name} onChange={(e) => handleOptionChecked(e, props.item)} />
    <span>{props.item}</span>
  </div>;
  function handleOptionChecked(e, item) {
    props.onChecked(e, item);
  }
};


CheckBox.propTypes = {
  name: React.PropTypes.string,
  item: React.PropTypes.string,
  onChecked: React.PropTypes.func,
};

export default CheckBox;
