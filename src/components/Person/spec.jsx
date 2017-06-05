import styles from './style.postcss';

import React from 'react';
import { shallow } from 'enzyme';
import StudentPicture from 'components/StudentPicture';
import AdultPicture from 'components/AdultPicture';
import Person from './';

describe('<Person />', () => {
  it('renders StudentPicture if provided', () => {
    const wrapper = shallow(<Person><StudentPicture /></Person>);
    expect(wrapper.find(StudentPicture)).toHaveLength(1);
  });

  it('renders AdultPicture if provided', () => {
    const wrapper = shallow(<Person><AdultPicture /></Person>);
    expect(wrapper.find(AdultPicture)).toHaveLength(1);
  });

  it('renders only the first picture provided', () => {
    const wrapper = shallow(<Person>
      <AdultPicture />
      <AdultPicture />
      <StudentPicture />
    </Person>);
    expect(wrapper.find(AdultPicture)).toHaveLength(1);
    expect(wrapper.find(StudentPicture)).toHaveLength(0);
  });

  it('renders all the other children as "lines"', () => {
    const wrapper = shallow(<Person>
      <AdultPicture />
      <div id="line-1" />
      <h1 id="line-2">Line 2</h1>
      <div id="line-3" />
    </Person>);
    const lines = wrapper.find(`.${styles.Person_lines}`);
    expect(lines).to.have.descendants('#line-1');
    expect(lines).to.have.descendants('#line-2');
    expect(lines).to.have.descendants('#line-3');
  });
});
