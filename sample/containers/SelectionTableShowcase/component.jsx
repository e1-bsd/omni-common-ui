import React from 'react';
import Showcase from 'components/Showcase';
import { SelectionTable } from 'omni-common-ui';

const SelectionTableShowcase = () =>
  <Showcase title="Selection Table" titleLink="selectionTable">
    <div>
      <SelectionTable title="Classroom" rootLinkTitle="Global">
        <SelectionTable.Level label="CN">
          <SelectionTable.Level label="CN-OWN">
            <SelectionTable.Level label="Shanghai">
              <SelectionTable.Level label="PD">
                <SelectionTable.Leaf>PD School list</SelectionTable.Leaf>
              </SelectionTable.Level>
              <SelectionTable.Level label="XH">
                <SelectionTable.Leaf>XH School list</SelectionTable.Leaf>
              </SelectionTable.Level>
            </SelectionTable.Level>
            <SelectionTable.Level label="Beijing">
              <SelectionTable.Leaf>Beijing School list</SelectionTable.Leaf>
            </SelectionTable.Level>
          </SelectionTable.Level>
          <SelectionTable.Level label="CN-FRA">
            <SelectionTable.Leaf>CN-FRA School list</SelectionTable.Leaf>
          </SelectionTable.Level>
        </SelectionTable.Level>
        <SelectionTable.Level label="RU">
          <SelectionTable.Leaf>RU School list</SelectionTable.Leaf>
        </SelectionTable.Level>
      </SelectionTable>
    </div>
  </Showcase>;

export default SelectionTableShowcase;
