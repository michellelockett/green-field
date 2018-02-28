const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

describe(`Mocha and Chai`, () => {
  it(`should be installed and working`, () => {
    expect(chai).to.be.a('object');
  });
});
