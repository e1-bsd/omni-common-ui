import React from 'react';
import { shallow } from 'enzyme';
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

    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Breadcrumbs items={[groupLink, markAttendanceLink]} />);
    });

    test('links has been rendered properly', () => {
      expect(wrapper.find(`.${styles.Breadcrumbs_crumb}`)).toHaveLength(2);
    });

    test('back button has been rendered properly', () => {
      expect(wrapper).to.have.descendants(`.${styles.Breadcrumbs_crumb_back}`);
    });

    test('only render the first item as a link', () => {
      expect(wrapper.find(`.${styles.Breadcrumbs_crumb}`).last().find('span'))
        .to.have.text('mark attendance');
      expect(wrapper.find(`.${styles.Breadcrumbs_crumb}`).first().contains(<Link />));
    });
  });
});
