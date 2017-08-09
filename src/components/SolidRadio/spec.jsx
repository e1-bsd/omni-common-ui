import React from 'react';
import { shallow, mount } from 'enzyme';
import SolidRadio from './';

let props;

beforeEach(() => {
  props = {
    id: 'an id',
    name: 'a name',
    value: 'a value',
    isChecked: false,
    onChange: jest.fn(),
  };
});

test('passes on the isChecked, value, name and id props', () => {
  const wrapper = shallow(<SolidRadio {...props} />);
  const input = wrapper.find('input');
  checkAllProps();

  props.isChecked = true;
  wrapper.setProps(props);
  checkAllProps();

  function checkAllProps() {
    expect(input.prop('id')).toBe(props.id);
    expect(input.prop('name')).toBe(props.name);
    expect(input.prop('value')).toBe(props.value);
    expect(input.prop('isChecked')).toBe(props.checked);
  }
});

test('calls onChange with the value of the radio button when the checked status is changed', () => {
  const wrapper = mount(<SolidRadio {...props} />);
  wrapper.find('input').simulate('change', { target: { value: false } });
  expect(props.onChange).toHaveBeenCalledWith(false);
});

test('does not break if onChange is not provided', () => {
  props.onChange = undefined;
  const wrapper = mount(<SolidRadio {...props} />);
  expect(() => wrapper.find('input').simulate('change')).not.toThrow();
});
