import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Link } from 'react-router';
import Breadcrumbs from './';
import styles from './style.postcss';

describe('<Breadcrumbs />', () => {

  describe('check basic render functionality', () => {
    const groupLink = {
      label: 'group1',
      href: '/group/1',
      clickable: true,
    };
    const markAttendanceLink = {
      label: 'mark attendance',
      clickable: false,
    };
    const items = [groupLink, markAttendanceLink];
    const wrapper = shallow(<Breadcrumbs items={items} />);

    it('links has been rendered properly', () => {
      expect(wrapper.find(`.${styles.Breadcrumbs_crumb}`)).to.have.length(2);
    });

    it('back button has been rendered properly', () => {
      expect(wrapper.find(`.${styles.Breadcrumbs_crumb_back}`)).to.have.length(1);
    });

    it('only render the first item as a link', () => {
      expect(wrapper.find(`.${styles.Breadcrumbs_crumb}`).last().find('span'))
        .to.have.text('mark attendance');
      expect(wrapper.find(`.${styles.Breadcrumbs_crumb}`).first().contains(<Link />));
    });

  });

});
