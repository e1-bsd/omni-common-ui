import styles from './style.postcss';
import testImg from './test-image.png';

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Student from './';

describe('Student', () => {
  it('show student with src and name provide', () => {
    const ruben = {
      name: 'Rubén',
      surname: 'Illodo Brea',
      middleName: 'master',
      src: testImg,
    };

    const wrapper = shallow(<Student src={ruben.src}
        surname={ruben.surname}
        name={ruben.name}
        middleName={ruben.middleName} />);

    expect(wrapper.find(`.${styles.Student}`)).to.have.length(1);
    expect(wrapper.find('.test-student-name').text()).to.eql(ruben.name);
    expect(wrapper.find('.test-student-middleName').text()).to.eql(ruben.middleName);
    expect(wrapper.find('.test-student-surname').text()).to.eql(ruben.surname);
  });
});
