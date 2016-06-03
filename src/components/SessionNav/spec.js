import styles from './style.postcss';

import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import SessionNav from './';

describe('SessionNav', () => {
  const sessions = [{ name: 'Unit 1', date: 'Saturday, 4 June 2016' },
    { name: 'Unit 2', date: 'Saturday, 11 June 2016' },
    { name: 'Unit 3', date: 'Saturday, 18 June 2016' }];
  it('hide the back button in the first item', () => {
    const current = 0;
    const wrapper = shallow(<SessionNav items={sessions} current={current} />);
    expect(wrapper.find(`.${styles.SessionNav}`)).to.have.length(1);
    expect(wrapper.find(`.${styles.SessionNav_forward}`)).to.have.length(1);
    expect(wrapper.find(`.${styles.SessionNav_back}`)).to.have.length(0);
    expect(wrapper.find(`.${styles.SessionNav_emptyBtn}`)).to.have.length(1);
  });

  it('display forward&back button in the second item', () => {
    const current = 1;
    const wrapper = shallow(<SessionNav items={sessions} current={current} />);
    expect(wrapper.find(`.${styles.SessionNav}`)).to.have.length(1);
    expect(wrapper.find(`.${styles.SessionNav_forward}`)).to.have.length(1);
    expect(wrapper.find(`.${styles.SessionNav_back}`)).to.have.length(1);
    expect(wrapper.find(`.${styles.SessionNav_emptyBtn}`)).to.have.length(0);
  });

  it('hide the forward button in the last item', () => {
    const current = 2;
    const wrapper = shallow(<SessionNav items={sessions} current={current} />);
    expect(wrapper.find(`.${styles.SessionNav}`)).to.have.length(1);
    expect(wrapper.find(`.${styles.SessionNav_forward}`)).to.have.length(0);
    expect(wrapper.find(`.${styles.SessionNav_back}`)).to.have.length(1);
    expect(wrapper.find(`.${styles.SessionNav_emptyBtn}`)).to.have.length(1);
  });

  it('back and forward btn callback is working', () => {
    const wrapper = mount(<SessionNav items={sessions}
        current={1}
        onForward={() => wrapper.setProps({ current: 2 })}
        onBack={() => wrapper.setProps({ current: 0 })} />);
    wrapper.find(`.${styles.SessionNav_forward}`).simulate('click');
    expect(wrapper.prop('current')).to.eql(2);
    wrapper.find(`.${styles.SessionNav_back}`).simulate('click');
    expect(wrapper.prop('current')).to.eql(0);
  });
});

describe('SessionNav', () => {
  const sessions = [{ name: 'Unit 1', date: 'Saturday, 4 June 2016' }];
  it('hide the back button in the first item', () => {
    const current = 0;
    const wrapper = shallow(<SessionNav items={sessions} current={current} />);
    expect(wrapper.find(`.${styles.SessionNav}`)).to.have.length(1);
    expect(wrapper.find(`.${styles.SessionNav_forward}`)).to.have.length(0);
    expect(wrapper.find(`.${styles.SessionNav_back}`)).to.have.length(0);
    expect(wrapper.find(`.${styles.SessionNav_emptyBtn}`)).to.have.length(2);
  });
});
