import styles from './style.postcss';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Sinon from 'sinon';
import ErrorPage from './';
import Button from 'components/Button';

describe('<ErrorPageHandler />', () => {
  describe('<ErrorPage />', () => {
    let props;

    beforeEach(() => {
      props = {
        replace: Sinon.spy(),
        afterButtonClicked: Sinon.spy(),
        erroredApi: {
          error: new Error('an error'),
        },
      };
    });

    it('uses the default behaviour if no config is passed', () => {
      const wrapper = shallow(<ErrorPage {...props} />);
      expect(wrapper.find(`.${styles.ErrorPage_text}`)).to.contain('an error');
      expect(wrapper.find(Button)).to.contain('Back');

      wrapper.find(Button).simulate('click');
      expect(props.replace.calledOnce).to.equal(true, 'replace called once');
      expect(props.replace.args[0]).to.eql(['/']);
    });

    it('calls afterButtonClicked after clicking the button even ' +
        'if no config.onClickButton is provided', () => {
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

    it('allows to customise the button\'s onClick if config.onClickButton is provided', () => {
      props.config = { onClickButton: () => '/custom/path' };
      const wrapper = shallow(<ErrorPage {...props} />);
      wrapper.find(Button).simulate('click');
      expect(props.replace.calledOnce).to.equal(true, 'replace called once');
      expect(props.replace.args[0]).to.eql(['/custom/path']);
    });

    it('calls all config functions with (erroredApi, props)', () => {
      props.config = { message: Sinon.spy(), buttonText: Sinon.spy(), onClickButton: Sinon.spy() };
      const wrapper = shallow(<ErrorPage {...props} />);
      wrapper.find(Button).simulate('click');
      expect(props.config.message.calledOnce).to.equal(true, 'message called once');
      expect(props.config.message.args).to.eql([[props.erroredApi, props]], 'message params');
      expect(props.config.buttonText.calledOnce).to.equal(true, 'buttonText called once');
      expect(props.config.buttonText.args).to.eql([[props.erroredApi, props]], 'buttonText params');
      expect(props.config.onClickButton.calledOnce).to.equal(true, 'onClickButton called once');
      expect(props.config.onClickButton.args)
          .to.eql([[props.erroredApi, props]], 'onClickButton params');
    });
  });
});
