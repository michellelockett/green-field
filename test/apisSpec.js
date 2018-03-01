// // Require dependencies
// const mocha = require('mocha');
// const chai = require('chai');
// const axios = require('axios');
// const expect = chai.expect;

// // Require DB, Models
// const {db, User, Book, Author} = require('../models/index');

// /*
//   PLEASE READ

//   To properly run these tests, make sure that the seed
//   generation in models/index.js is commented out, the server restarted,
//   and the server running.

// */


// describe(`Mocha and Chai`, () => {
//   it(`should be installed and working`, () => {
//     expect(chai).to.be.a('object');
//   });
// });


// describe(`Conan server`, (done) => {

//   before((done) => {
//     db.sync({force: true})
//     .then(() => {
//       done();
//     })
//     .catch((err) => {
//       done();
//     })

//   });

//   describe(`Getting books`, (done) => {

//     let response = null;

//     before((done) => {
//       axios.get('http://localhost:3000/users/2')
//       .then((serverResponse) => {
//         response = serverResponse;
//         done();
//       })
//       .catch((err) => {
//         console.log(err);
//         done();
//       });
//     });

//     it(`should respond to GET request to /users/:id by returning that user's information`, (done) => {
//       expect(response.status).to.equal(200);
//       expect(response.data).to.be.a('object');
//       done();
//     });

//     it(`should respond to GET request to /users/:id by returning that user's associated books`, (done) => {
//       expect(response.data.books).to.be.a('array');
//       expect(response.data.books.length).to.equal(1);
//       expect(response.data.books[0]).to.be.a('object');
//       done();
//     });

//     it(`each book should have a 'title' property that is a string`, (done) => {
//       expect(response.data.books[0]).to.have.property('title');
//       expect(response.data.books[0].title).to.be.a('string');
//       expect(response.data.books[0].title).to.be.equal('A Tale for the Time Being');
//       done();
//     });

//     it(`each book should have a 'title' property that is a string`, (done) => {
//       expect(response.data.books[0]).to.have.property('title');
//       expect(response.data.books[0].title).to.be.a('string');
//       expect(response.data.books[0].title).to.be.equal('A Tale for the Time Being');
//       done();
//     });
//   });

//   describe(`Adding a book`, (done) => {
//     let firstResponse = null;
//     let secondResponse = null;

//     before((done) => {

//       axios.get('http://localhost:3000/users/2')
//       .then((serverResponse) => {
//         firstResponse = serverResponse;
//       })
//       .then(() => {
//         return axios.post('http://localhost:3000/users/2/books/isbn/9781590171998/false')
//       })
//       .then(() => {
//         return axios.get('http://localhost:3000/users/2');
//       })
//       .then((serverResponse) => {
//         secondResponse = serverResponse;
//       })
//       .then(() => {
//         done();
//       })
//       .catch((err) => {
//         console.log(err);
//         done();
//       });

//     });

//     it(`should respond to a POST request to /users/:id/books/isbn/:isbn/:owned by posting a new book`, (done) => {
//       expect(firstResponse.data.books.length).to.equal(1);
//       expect(secondResponse.data.books.length).to.equal(2);
//       done();
//     });

//     it(`each book should have the correct isbn`, (done) => {
//       expect(secondResponse.data.books[1].isbn).to.equal('9781590171998');
//       done();
//     });

//   });

// });

