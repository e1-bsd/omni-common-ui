import styles from './style.postcss';
import React from 'react';
import { shallow } from 'enzyme';
import { ErrorPage } from './';

describe('<ErrorPageHandler />', () => {
  describe('<ErrorPage />', () => {
    let props;

    beforeEach(() => {
      props = {
        erroredApi: {
          error: new Error('an error'),
        },
      };
    });

    it('uses the default behaviour if no config is passed', () => {
      const wrapper = shallow(<ErrorPage {...props} />);
      expect(wrapper.find(`.${styles.ErrorPage_text}`)).toContain('Omni could not load this page.');
      expect(wrapper.find(`.${styles.ErrorPage_image}`)).to.have.prop('id', 'warning');
    });

    it('allows to customise the icon if config.icon is provided', () => {
      props.config = { icon: () => 'custom-id' };
      const wrapper = shallow(<ErrorPage {...props} />);
      expect(wrapper.find(`.${styles.ErrorPage_image}`)).to.have.prop('id', 'custom-id');
    });

    it('allows to customise the error message if config.message is provided', () => {
      props.config = { message: () => 'my custom error' };
      const wrapper = shallow(<ErrorPage {...props} />);
      expect(wrapper.find(`.${styles.ErrorPage_text}`)).toContain('my custom error');
    });
  });
});
