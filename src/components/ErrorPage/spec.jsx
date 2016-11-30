import styles from './style.postcss';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Sinon from 'sinon';
import Button from 'components/Button';
import ErrorPage from './';

describe('<ErrorPageHandler />', () => {
  describe('<ErrorPage />', () => {
    let props;

    beforeEach(() => {
      props = {
        afterButtonClicked: Sinon.spy(),
        location: { pathname: '/current/path' },
        erroredApi: {
          error: new Error('an error'),
        },
      };
    });

    it('uses the default behaviour if no config is passed', () => {
      const wrapper = shallow(<ErrorPage {...props} />);
      expect(wrapper.find(`.${styles.ErrorPage_text}`))
          .to.contain('Omni could not load this page.');
      expect(wrapper.find(Button)).to.have.prop('children', 'Back');
      expect(wrapper.find(Button)).to.have.prop('linkTo', '/');
    });

    it('calls afterButtonClicked after clicking the button even ' +
        'if no config.buttonLink is provided', () => {
      const wrapper = shallow(<ErrorPage {...props} />);
      wrapper.find(Button).simulate('click');
      expect(props.afterButtonClicked.calledOnce).to.be.true;
    });

    it('allows to customise the error message if config.message is provided', () => {
      props.config = { message: () => 'my custom error' };
      const wrapper = shallow(<ErrorPage {...props} />);
      expect(wrapper.find(`.${styles.ErrorPage_text}`)).to.contain('my custom error');
    });

    it('allows to customise the text in the button if config.buttonText is provided', () => {
      props.config = { buttonText: () => 'my custom button' };
      const wrapper = shallow(<ErrorPage {...props} />);
      expect(wrapper.find(Button)).to.contain('my custom button');
    });

    it('allows to customise the button\'s link if config.buttonLink is provided', () => {
      props.config = { buttonLink: () => '/custom/path' };
      const wrapper = shallow(<ErrorPage {...props} />);
      expect(wrapper.find(Button)).to.have.prop('linkTo', '/custom/path');
    });

    it('calls all config functions with (erroredApi, props)', () => {
      props.config = { message: Sinon.spy(), buttonText: Sinon.spy(), buttonLink: Sinon.spy() };
      const wrapper = shallow(<ErrorPage {...props} />);
      wrapper.find(Button).simulate('click');
      expect(props.config.message.calledOnce).to.equal(true, 'message called once');
      expect(props.config.message.args).to.eql([[props.erroredApi, props]], 'message params');
      expect(props.config.buttonText.calledOnce).to.equal(true, 'buttonText called once');
      expect(props.config.buttonText.args).to.eql([[props.erroredApi, props]], 'buttonText params');
      expect(props.config.buttonLink.calledOnce).to.equal(true, 'buttonLink called once');
      expect(props.config.buttonLink.args)
          .to.eql([[props.erroredApi, props]], 'buttonLink params');
    });

    it('hides the button if its link points to the current URL', () => {
      props.config = { buttonLink: () => 'current/Path/' };
      const wrapper = shallow(<ErrorPage {...props} />);
      expect(wrapper.find(Button)).to.have.length(0);
    });
  });
});
