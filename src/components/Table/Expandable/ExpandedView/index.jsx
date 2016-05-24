import React from 'react';
import Card from 'components/Card';

const ExpandedView = (props) =>
    <Card>
      {props.children}
    </Card>;

export default ExpandedView;
