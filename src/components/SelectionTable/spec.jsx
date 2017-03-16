import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import PageCard from 'components/PageCard';
import SelectionTable from './';

describe('<SelectionTable />', () => {
  it('renders the root Level and title', () => {
    const selectionTable = <SelectionTable title="Classroom">
      <SelectionTable.Level label="CN" />
      <SelectionTable.Level label="RU" />
    </SelectionTable>;
    const wrapper = shallow(selectionTable);
    expect(wrapper.find(SelectionTable.Level)).to.have.length(2);
    expect(wrapper.find(PageCard.Heading)).to.have.length(1);
  });

});
