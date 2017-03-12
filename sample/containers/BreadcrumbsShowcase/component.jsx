import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import Showcase from 'components/Showcase';

const BreadcrumbsShowcase = () => {
  const items = [...Array(5).keys()].map((i) => ({
    label: `${i === 0 ? 'Home' : 'Intermediate'} ${i}`,
    href: '/',
    clickable: i === 0,
  })).concat([{
    label: 'Current Page',
    clickable: false,
  }]);
  return <Showcase title="Breadcrumbs" titleLink="breadcrumbs">
    <h2>Standard Mode</h2>
    <Breadcrumbs backHref="/" items={items} />
    <h2>Single Line Mode</h2>
    <Breadcrumbs backHref="/" items={items} singleLineMode />
  </Showcase>;
};

export default BreadcrumbsShowcase;
