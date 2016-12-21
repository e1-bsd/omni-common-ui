import styles from './style.postcss';

import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import ReactGA from 'react-ga';

const Breadcrumbs = (props) => <nav className={styles.Breadcrumbs}>
  <ul className={styles.Breadcrumbs_list}>
    {props.items.map((item, idx) => {
      const indexedCrumbClassName = styles[`Breadcrumbs_crumb_${idx}`];
      const itemClassNames = classnames(styles.Breadcrumbs_crumb, {
        [indexedCrumbClassName]: !! indexedCrumbClassName,
        [styles.__clickable]: !! item.clickable,
      });
      const itemKey = item.label + item.href;
      return <li key={itemKey} className={itemClassNames}>
        {item.clickable ? <Link to={item.href} onClick={onClick}>
          {item.label}
        </Link> : <span>
          {item.label}
        </span>}
      </li>;

      function onClick() {
        ReactGA.event({
          category: 'Navigation',
          action: 'Clicked breadcrumb',
          label: `Clicked breadcrumb ${item.label}`,
        });
      }
    })}
  </ul>
</nav>;

Breadcrumbs.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    label: React.PropTypes.string.isRequired,
    href: React.PropTypes.string.isRequired,
    clickable: React.PropTypes.bool.isRequired,
  })).isRequired,
  backHref: React.PropTypes.string.isRequired,
};

export default Breadcrumbs;
