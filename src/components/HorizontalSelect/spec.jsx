import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Sinon from 'sinon';
import styles from './style.postcss';

describe('<HorizontalSelect />', () => {
  // eslint-disable-next-line react/prop-types
  const Link = ({ onClick }) => <div onClick={onClick} />;
  let HorizontalSelect;

  beforeEach(() => {
    // eslint-disable-next-line global-require, import/no-webpack-loader-syntax
    HorizontalSelect = require('inject?react-router!./')({
      'react-router': { Link },
    }).default;
  });

  it('renders option html as a node', () => {
    const helloNodeHtml = <div>hello</div>;
    const options = [{
      html: helloNodeHtml,
      value: 'hello',
    }];
    expect(shallow(<HorizontalSelect options={options} />)).to.contain(helloNodeHtml);
  });

  it('onSelect is called once being clicked', () => {
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
    wrapper.find(Link).last().simulate('click');
    expect(testOnSelect.args[0]).to.eql([2]);
  });

  it('set active styles to the selected option', () => {
    const options = [{
      html: <div>hello</div>,
      value: 1,
    }];
    expect(shallow(<HorizontalSelect options={options} value={1} />)
      .find(`.${styles.HorizontalSelect_option_active}`))
      .to.have.length(1);
  });
});
