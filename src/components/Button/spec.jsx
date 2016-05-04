import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Sinon from 'sinon';
import Button from './button';

describe('Button', () => {
  it('renders its children', () => {
    const wrapper = shallow(<Button><div id="innerContent" /></Button>);
    expect(wrapper.contains(<div id="innerContent" />)).to.be.true;
  });

  it('calls onClick when clicked', () => {
    const onClick = Sinon.spy();
    const wrapper = shallow(<Button onClick={onClick} />);
    wrapper.simulate('click', { preventDefault: () => {} });
    expect(onClick.called).to.be.true;
  });

  it('thows error if invalid type is passed', () => {
    expect(() => shallow(<Button type="faketype" />)).to.throw();
  });
});
