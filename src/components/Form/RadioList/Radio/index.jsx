import React from 'react';
import PropTypes from 'prop-types';

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
  name: PropTypes.string,
  item: PropTypes.string,
  onChecked: PropTypes.func,
};

export default Radio;
