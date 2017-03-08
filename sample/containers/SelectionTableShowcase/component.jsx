import React from 'react';
import Showcase from 'components/Showcase';
import { SelectionTable } from 'omni-common-ui';

const SelectionTableShowcase = () =>
  <Showcase title="Selection Table" titleLink="selectionTable">
    <div>
      <SelectionTable />
    </div>
  </Showcase>;

export default SelectionTableShowcase;
