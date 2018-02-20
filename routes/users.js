const express = require('express')
const router = express.Router()
// const { userController } = require('../controllers/user');

//routes for users of the book app interacting with the server

// // create a user
// app.post('/users', (req, res) => {
//   // direct to method in Users controller/model handler
//   res.send('This will return an object containing a status message confirming creation of the specific user.');
// });

// read all users
// note: may be deprecated
router.get('/', (req, res) => {
  // userController.getUsers(req, res);
});

// // read a specific user
// app.get('/users/:id', (req, res) => {
//   // direct to method in Users controller/model handler
//   // passing :id from params
//   res.send('This will return an object containing a status message and selected information for a specific user.');
// });

// // update a specific user
// app.put('/users/:id', (req, res) => {
//   // direct to method in Users controller/model handler
//   // passing :id from params
//   res.send('This will return an object containing a status message and updated information for a specific user.');
// });

// // destroy a user account
// // note: may be deprecated
// app.delete('/users/:id', (req, res) => {
//   // direct to method in Users controller/model handler
//   // passing :id from params
//   res.send('This will return an object containing a status message confirming deletion of the specific user.');
// });

// // signin
// app.post('/signin', (req, res) => {
//   // direct to method in Users (or Authentication) controller/modle handler
//   res.send('This will return an object containing a status message confirming login.');
//   // Note: may choose to issue a server-originating redirect.
// });

// // logout
// app.post('/logout', (req, res) => {
//   // direct to method in Users (or Authentication) controller/modle handler
//   res.send('This will return an object containing a status message confirming logout.');
//   // Note: may choose to issue a server-originating redirect.
// });

exports.userRoutes = router;