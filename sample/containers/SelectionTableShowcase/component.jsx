import styles from './style.postcss';

import React from 'react';
import Showcase from 'components/Showcase';
import { SelectionTable, Button } from 'omni-common-ui';

const SelectionTableShowcase = () =>
  <Showcase title="Selection Table" titleLink="selectionTable">
    <div>
      <SelectionTable title="Classroom"
          rootLinkTitle="Global"
          headerClassName={styles.SelectionTableShowCase_selectionTable_header}
          hideRootLink>
        <SelectionTable.Header>
          <Button type={Button.Type.default}
              className={styles.SelectionTableShowCase_selectionTable_header_inner} >
            <span>TARGET LANGUAGE</span>
          </Button>
        </SelectionTable.Header>
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
