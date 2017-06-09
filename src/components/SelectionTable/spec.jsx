import React from 'react';
import { mount } from 'enzyme';
import PageCard from 'components/PageCard';
import SelectionTable from './';

test('renders the root Level and title', () => {
  const selectionTableTitle = 'Classroom';
  const selectionTable = <SelectionTable title={selectionTableTitle}>
    <SelectionTable.Level label="CN" />
    <SelectionTable.Level label="RU" />
  </SelectionTable>;
  const wrapper = mount(selectionTable);
  expect(wrapper.find(SelectionTable.Level)).toHaveLength(2);
  expect(wrapper.find(PageCard.Heading).prop('text')).toBe(selectionTableTitle);
});

test('render sub-Level once a level is clicked', () => {
  const selectionTable = <SelectionTable>
    <SelectionTable.Level label="CN">
      <SelectionTable.Level label="CN-1" />
      <SelectionTable.Level label="CN-2" />
      <SelectionTable.Level label="CN-3" />
    </SelectionTable.Level>
    <SelectionTable.Level label="RU">
      <SelectionTable.Level label="CN-1" />
    </SelectionTable.Level>
  </SelectionTable>;

  const wrapper = mount(selectionTable);
  expect(wrapper.find(SelectionTable.Level)).toHaveLength(2);
  wrapper.find(SelectionTable.Level).first().simulate('click');
  expect(wrapper.find(SelectionTable.Level)).toHaveLength(3);
  expect(wrapper.find(SelectionTable.Level).first().prop('label')).toBe('CN-1');
});
