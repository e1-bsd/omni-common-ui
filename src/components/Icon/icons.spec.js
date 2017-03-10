import { expect } from 'chai';
import icons from './icons';
import magnifyinGlassIcon from './magnifying-glass.svg';

describe('<Icon />', () => {
  describe('icons list', () => {
    const iconId = 'magnifying-glass';

    it('loads the icons properly into a map', () => {
      expect(icons.get(iconId)).to.equal(magnifyinGlassIcon);
    });
  });
});
