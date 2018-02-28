const mocha = require('mocha');
const chai = require('chai');
const axios = require('axios');
const expect = chai.expect;

describe(`Mocha and Chai`, () => {
  it(`should be installed and working`, () => {
    expect(chai).to.be.a('object');
  });
});


describe(`Conan server`, () => {

  it(`should respond to POST request to /users by creating a new user`, (done) => {
    axios.get('/users/2')
    .then((response) => {
      expect(response.status).to.be(200);
    })

    done();
  });

});
