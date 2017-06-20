import styles from './style.postcss';

import React from 'react';
import { shallow, mount } from 'enzyme';
import { Field } from './';

const requiredPropNoops = {
  showError: () => false,
  showRequired: () => false,
  getErrorMessage: () => '',
};

describe('applies className and labelTextClassName', () => {
  test('applies className to itself', () => {
    const wrapper = mount(<Field {...requiredPropNoops} className="fieldextra" />);
    expect(wrapper.find(`.${styles.Field}.fieldextra`)).toHaveLength(1);
  });

  test('applies labelTextClassName to label span', () => {
    const wrapper = mount(<Field {...requiredPropNoops} labelTextClassName="labelextra" />);
    expect(wrapper.find(`.${styles.Field_wrap_label}.labelextra`)).toHaveLength(1);
  });
});

describe('applies the error state style', () => {
  test('applies error style if showError returns true', () => {
    const wrapper = shallow(<Field {...requiredPropNoops} showError={() => true} />);
    expect(wrapper.find(`.${styles.__error}`)).toHaveLength(1);
  });

  test('does not apply error style if showError returns false', () => {
    const wrapper = shallow(<Field {...requiredPropNoops} />);
    expect(wrapper.find(`.${styles.__error}`)).toHaveLength(0);
  });

  test('shows the error message provided by getErrorMessage ' +
      'if showError returns true', () => {
    const errorMessage = 'This is not a valid email';
    const wrapper = shallow(<Field showError={() => true}
        showRequired={() => false}
        getErrorMessage={() => errorMessage} />);
    expect(wrapper.text()).toBe(errorMessage);
  });

  test('does not show the error message provided by getErrorMessage ' +
      'if showError returns false', () => {
    const wrapper = shallow(<Field {...requiredPropNoops} />);
    const errorClass = styles.Field_wrap_inputContainer_validationError;
    expect(wrapper.find(`.${errorClass}`)).toHaveLength(0);
  });
});

describe('applies the required field style', () => {
  test('applies required styles if showRequired returns true', () => {
    const wrapper = mount(<Field showError={() => false}
        showRequired={() => true}
        getErrorMessage={() => ''} />);
    expect(wrapper.find(`.${styles.__required}`)).toHaveLength(1);
  });

  test('does not apply required styles if showRequired returns false', () => {
    const wrapper = mount(<Field {...requiredPropNoops} />);
    expect(wrapper.find(`.${styles.__required}`)).toHaveLength(0);
  });
});

describe('allows for an optional label to be provided', () => {
  test('does not use a label if useLabel is not provided', () => {
    const wrapper = mount(<Field {...requiredPropNoops} />);
    expect(wrapper.find('label')).toHaveLength(0);
  });

  test('uses a label if useLabel is provided', () => {
    const wrapper = mount(<Field {...requiredPropNoops} useLabel />);
    expect(wrapper.find('label')).toHaveLength(1);
  });
});

describe('allows field stack mode to be changed', () => {
  test('does not apply Field.__stackedHorizontally by default', () => {
    const wrapper = mount(<Field {...requiredPropNoops} />);
    expect(wrapper.find(`.${styles.Field}.${styles.__stackedHorizontally}`)).toHaveLength(0);
  });

  test('does not apply Field_wrap.__stackedVertically by default', () => {
    const wrapper = mount(<Field {...requiredPropNoops} />);
    expect(wrapper.find(`.${styles.Field_wrap}.${styles.__stackedVertically}`)).toHaveLength(0);
  });

  test('applies Field.__stackedHorizontally when enabled', () => {
    const wrapper = mount(<Field {...requiredPropNoops} neighborStackMode="horizontal" />);
    expect(wrapper.find(`.${styles.Field}.${styles.__stackedHorizontally}`)).toHaveLength(1);
  });

  test('applies Field_wrap.__stackedVertically when enabled', () => {
    const wrapper = mount(<Field {...requiredPropNoops} innerStackMode="vertical" />);
    expect(wrapper.find(`.${styles.Field_wrap}.${styles.__stackedVertically}`)).toHaveLength(1);
  });
});
