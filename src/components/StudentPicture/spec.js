import { expect } from 'chai';
import StudentPicture from './';
import Gender from 'domain/Gender';

describe('<StudentPicture />', () => {
  it('contains Gender object', () => {
    expect(StudentPicture.Gender).to.equal(Gender);
  });
});
