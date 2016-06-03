import React from 'react';

const requireShowcases = require.context('containers',
    true,
    /^\.\/[A-Za-z]+Showcase\/index\.jsx?/);
const allShowcases = requireShowcases.keys()
    .map(requireShowcases)
    .map((item) => item.default);

const All = () => <div>
  {allShowcases.map((Component) => <Component key={Component.name} />)}
</div>;

export default All;
