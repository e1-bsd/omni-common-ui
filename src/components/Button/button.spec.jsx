import styles from './style.postcss';

import React from 'react';
import { Link } from 'react-router';
import { shallow, mount } from 'enzyme';
import Sinon from 'sinon';
import Button from './';
import { Type } from './type';

describe('Button', () => {
  it('contains Type object', () => {
    expect(Button.Type).toBe(Type);
  });

  it('renders its children', () => {
    const wrapper = shallow(<Button><div id="innerContent" /></Button>);
    expect(wrapper.contains(<div id="innerContent" />)).toBe(true);
  });

  it('renders a Link when linkTo is provided', () => {
    const wrapper = shallow(<Button linkTo="/" />);
    expect(wrapper.find(Link)).toHaveLength(1);
  });

  it('will open link in a new Tab if newTab is provided', () => {
    const wrapper = shallow(<Button linkHref="/" newTab />);
    expect(wrapper.prop('target')).toBe('_blank');
  });

  it('thows error if invalid type is passed', () => {
    expect(() => shallow(<Button type="faketype" />)).toThrowError();
  });

  it('applies proper styles if Type.primary is passed', () => {
    const wrapper = shallow(<Button type={Type.primary} />);
    expect(wrapper.find(`.${styles.__primary}`)).toHaveLength(1);
  });

  it('applies proper styles if Type.default is passed', () => {
    const wrapper = shallow(<Button type={Type.default} />);
    expect(wrapper.find(`.${styles.__default}`)).toHaveLength(1);
  });

  it('uses Type.default if no type is provided', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.find(`.${styles.__default}`).length).toBe(1);
  });

  it('uses block styles if block property is provided', () => {
    const wrapper = shallow(<Button block />);
    expect(wrapper.find(`.${styles.__block}`).length).toBe(1);
  });

  it('uses block styles on Link and itself if block propery is provided', () => {
    const wrapper = shallow(<Button linkTo="/" block />);
    expect(wrapper.find(`.${styles.__block}`).length).toBe(2);
  });

  it('applies custom attrs when provided', () => {
    const wrapper = shallow(<Button attrs={{ type: 'submit' }} />);
    expect(wrapper.find('button[type="submit"]').length).toBe(1);
  });

  describe('when clicked', () => {
    it('calls onClick', () => {
      const onClick = Sinon.spy();
      const wrapper = shallow(<Button onClick={onClick} />);
      wrapper.simulate('click');
      expect(onClick.called).toBe(true);
    });

    it('sets the .__active class after 100ms', (done) => {
      const wrapper = mount(<Button onClick={() => {}} />);
      wrapper.simulate('click');
      setTimeout(() => {
        expect(wrapper).to.have.descendants(`.${styles.__active}`);
        done();
      }, 150);
    });

    it('removes the .__active class when onClick promise is resolved', (done) => {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 10);
      });
      const wrapper = mount(<Button onClick={() => promise}
          onClickActiveClassAddDelay={0} />);
      wrapper.simulate('click');
      setTimeout(() => {
        expect(wrapper.find(`.${styles.__active}`).length).toBe(0);
        done();
      }, 50);
    });

    it('does not fail if onClick is not provided', () => {
      const wrapper = shallow(<Button />);
      expect(() => wrapper.simulate('click')).not.toThrowError();
    });

    it('does nothing if it is disabled', () => {
      const onClick = Sinon.spy();
      const wrapper = shallow(<Button onClick={onClick} disabled />);
      wrapper.simulate('click');
      expect(onClick.called).toBe(false);
    });
  });
});
