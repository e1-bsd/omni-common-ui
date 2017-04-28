import React from 'react';
import HorizontalSelect from './';
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<HorizontalSelect />', () => {
  it('renders option html as a node', () => {
    const helloNodeHtml = <div>hello</div>;
    const options = [{
      html: helloNodeHtml,
      value: 'hello',
    }];
    expect(shallow(<HorizontalSelect options={options} />)).to.contain(helloNodeHtml);
  });

});
