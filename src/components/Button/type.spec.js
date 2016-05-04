import { expect } from 'chai';
import { Type, validateType } from './type';

describe('Type', () => {
  it('has default', () => {
    expect(Type.default).to.exist;
  });

  it('has danger', () => {
    expect(Type.danger).to.exist;
  });
});

describe('validateType', () => {
  it('accepts default', () => {
    expect(validateType(Type.default)).to.be.true;
  });

  it('accepts danger', () => {
    expect(validateType(Type.danger)).to.be.true;
  });

  it('throws error if invalid type is passed', () => {
    expect(() => validateType("faketype")).to.throw();
  });
});
