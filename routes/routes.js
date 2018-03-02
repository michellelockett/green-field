// Require dependencies
const express = require('express');
const router = express.Router();

// Require controllers
const userController = require('../controllers/user');
const bookController = require('../controllers/book');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



/**

USER - BOOK ROUTES

These routes relate to users and their relationship to books.
'Pure' routes (e.g., create a book with no reference to a user
will be implemented at the bottom of this file as needed).

**/

//configure passport

passport.use(new LocalStrategy(
  function(username, password, done) {
    userController.getUserByUsername(username, (err, user) => {
      if (err) {
        console.log("error: ", err);
      }
      if (!user) {
        return done(null, false, {message: 'Unknown User'});
      }

      userController.comparePassword(password, user.dataValues.hash, (err, isMatch) => {
        if (err) {
          console.log(err);
        }

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid Password'});
        }

      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  userController.getUserById(id, function(err, user) {
    done(err, user);
  });
});

// CREATE A BOOK AND ASSOCIATE TO CURRENT USER
// stub for route featuring boolean 'owned' values
router.post('/users/:id/books/isbn/:isbn/:owned', (req, res) => {
  // direct to method in Books controller/model handler
  bookController.postBook(req, res);
});

// CREATE A BOOK AND ASSOCIATE TO CURRENT USER
router.post('/users/:id/books/isbn/:isbn', (req, res) => {
  // direct to method in Books controller/model handler
  bookController.postBook(req, res);
});


// READ ALL BOOKS ASSOCIATED WITH CURRENT USER
router.get('/users/:user_id/books', (req, res) => {
  userController.getUserBooks(req, res);
});

// DESTROY ASSOCIATION BETWEEN USER AND BOOK
// Book itself will remain in database
router.delete('/users/:user_id/books/:book_id', (req, res) => {
  userController.deleteBook(req, res);
});

// Retrieve the information for a specific user
// And his/her associated books
router.get('/users/:id', (req, res) => {
  // console.log("IN ROUTES: ", req.params.id, req.user.id, req.params.id === req.user.id);
  if (req.user.id.toString() === req.params.id) {
    userController.getUserWithBooks(req, res);   
  } else {
    res.redirect('/error');
  }
  
});

router.get('/users/:id/books/list', (req, res) => {
  userController.getUserBookList(req, res);
});

/**

PURE USER ROUTES

**/

// router.post('/login', passport.authenticate('local', (req, res) => {
//   console.log(req);
//   res.send("SUCESSFUL LOZGINZZZ");
// }));

// router.get('/users', (req, res) => {
//   userController.getUsers(req, res);
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

module.exports = router;
