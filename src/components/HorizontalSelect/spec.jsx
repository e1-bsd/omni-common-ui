import React from 'react';
import { mount, shallow } from 'enzyme';
import Sinon from 'sinon';
import styles from './style.postcss';
import ReactRouter from 'react-router';
import HorizontalSelect from './';
import PropTypes from 'prop-types';

beforeEach(() => {
  ReactRouter.Link = ({ onClick }) => <div onClick={onClick} />;
  ReactRouter.Link.propTypes = { onClick: PropTypes.func };
});

test('renders option html as a node', () => {
  const helloNodeHtml = <div>hello</div>;
  const options = [{
    html: helloNodeHtml,
    value: 'hello',
  }];
  expect(shallow(<HorizontalSelect options={options} />)).toContain(helloNodeHtml);
});

test('onSelect is called once being clicked', () => {
  const options = [{
    html: <div>1</div>,
    value: 1,
  }, {
    html: <div>2</div>,
    value: 2,
  }];
  const testOnSelect = Sinon.spy();
  const wrapper = mount(<HorizontalSelect options={options}
      onSelect={testOnSelect} />);
  wrapper.find(ReactRouter.Link).last().simulate('click');
  expect(testOnSelect.args[0]).toEqual([2]);
});

test('set active styles to the selected option', () => {
  const options = [{
    html: <div>hello</div>,
    value: 1,
  }];
  expect(shallow(<HorizontalSelect options={options} value={1} />)
    .find(`.${styles.HorizontalSelect_option_active}`)).toHaveLength(1);
});
