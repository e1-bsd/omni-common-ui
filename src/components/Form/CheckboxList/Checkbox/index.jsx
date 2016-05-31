import React from 'react';

const CheckBox = (props) => <div key={props.key}>
  <input type="checkbox" name={props.name} />
  <span>{props.item}</span>
</div>;


CheckBox.propTypes = {
  key: React.PropTypes.string,
  name: React.PropTypes.string,
  item: React.PropTypes.string,
};

export default CheckBox;
