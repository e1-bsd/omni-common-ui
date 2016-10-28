import { mediaQuery } from './index.js';

class Queries {
  constructor() {
    this.xsQuery = mediaQuery('(min-width: 20em)');
    this.smQuery = mediaQuery('(min-width: 30em)');
    this.mdQuery = mediaQuery('(min-width: 75em)');
    this.state = {
      xs: !! this.xsQuery.matches,
      sm: !! this.smQuery.matches,
      md: !! this.mdQuery.matches,
    };
  }
}

export default Queries;
