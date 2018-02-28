const mocha = require('mocha');
const chai = require('chai');
const axios = require('axios');
const expect = chai.expect;

describe(`Mocha and Chai`, () => {
  it(`should be installed and working`, () => {
    expect(chai).to.be.a('object');
  });
});


describe(`Conan server`, (done) => {

  it(`should respond to GET request to /users/:id by returning that user's information`, (done) => {
    axios.get('http://localhost:3000/users/2')
    .then((response) => {
      expect(response.data).to.be.a('array');
      expect(response.status).to.be(200);
      done();
    })
    .then(() => {

    })
    .catch((err) => {
      console.log(err);
      done();
    })

  });

});
