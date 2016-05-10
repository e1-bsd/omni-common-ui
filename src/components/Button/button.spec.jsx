import styles from './style.postcss';

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Sinon from 'sinon';
import Button from './';
import { Type } from './type';

describe('Button', () => {
  it('contains Type object', () => {
    expect(Button.Type).to.equal(Type);
  });

  it('renders its children', () => {
    const wrapper = shallow(<Button><div id="innerContent" /></Button>);
    expect(wrapper.contains(<div id="innerContent" />)).to.be.true;
  });

  it('thows error if invalid type is passed', () => {
    expect(() => shallow(<Button type="faketype" />)).to.throw();
  });

  it('applies proper styles if Type.danger is passed', () => {
    const wrapper = shallow(<Button type={Type.danger} />);
    expect(wrapper.find(`.${styles.__danger}`).length).to.equal(1);
  });

  it('applies proper styles if Type.default is passed', () => {
    const wrapper = shallow(<Button type={Type.default} />);
    expect(wrapper.find(`.${styles.__default}`).length).to.equal(1);
  });

  it('uses Type.default if no type is provided', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.find(`.${styles.__default}`).length).to.equal(1);
  });

  it('applies inverse styles if true is provided for the property', () => {
    const wrapper = shallow(<Button inverse={true} />);
    expect(wrapper.find(`.${styles.__inverse}`).length).to.equal(1);
  });

  describe('when clicked', () => {
    const eventObjectMock = { preventDefault: () => {} };

    it('calls onClick', () => {
      const onClick = Sinon.spy();
      const wrapper = shallow(<Button onClick={onClick} />);
      wrapper.simulate('click', eventObjectMock);
      expect(onClick.called).to.be.true;
    });

    it('does not fail if onClick is not provided', () => {
      const wrapper = shallow(<Button />);
      expect(() => wrapper.simulate('click', eventObjectMock)).to.not.throw();
    });

    it('does nothing if it is disabled', () => {
      const onClick = Sinon.spy();
      const wrapper = shallow(<Button onClick={onClick} disabled={true} />);
      wrapper.simulate('click', eventObjectMock);
      expect(onClick.called).to.be.false;
    });
  });
});
