import React from 'react';
import Showcase from 'components/Showcase';
import { SelectionTable } from 'omni-common-ui';

const SelectionTableShowcase = () =>
  <Showcase title="Selection Table" titleLink="selectionTable">
    <div>
      <SelectionTable>
        <SelectionTable.Level label="CN-OWN" />
        <SelectionTable.Level label="CN-FRA" />
      </SelectionTable>
    </div>
  </Showcase>;

export default SelectionTableShowcase;
