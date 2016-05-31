import React from 'react';

const Radio = (props) => {
  return <div>
    <label>
      <input type="radio"
          name={props.name}
          onChange={(e) => handleOptionChecked(e, props.item)} />
      {props.item}
    </label>
  </div>;
  function handleOptionChecked(e, item) {
    props.onChecked(e, item);
  }
};


Radio.propTypes = {
  name: React.PropTypes.string,
  item: React.PropTypes.string,
  onChecked: React.PropTypes.func,
};

export default Radio;
