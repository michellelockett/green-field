// Require dependencies
const express = require('express');
const router = express.Router();

// Require controllers
const userController = require('../controllers/user');
const bookController = require('../controllers/book');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


/**

CONFIGURE PASSPORT LOGIN STRATEGY

**/

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

/**

USER - BOOK ROUTES

These routes relate to users and their relationship to books.
'Pure' routes (e.g., create a book with no reference to a user
will be implemented at the bottom of this file as needed).

**/

// CREATE A BOOK AND ASSOCIATE TO CURRENT USER
router.post('/users/:id/books/isbn/:isbn/:owned', (req, res) => {
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


// Retrieve the information for a specific user and their associated books
router.get('/users/:id', (req, res) => {
  if (req.user.id.toString() === req.params.id) {
    userController.getUserWithBooks(req, res);   
  } else {
    res.redirect('/error');
  }  
});


// UPDATE THE ASSOCIATION BETWEEN USER AND BOOK
router.put('/users/:id/books/:isbn', (req, res) => {
  userController.updateUserBook(req, res);
});


//GET THE BOOKLIST FOR EACH USER
router.get('/users/:id/books/list', (req, res) => {
  userController.getUserBookList(req, res);
});


/**

PURE USER ROUTES

**/

// UPDATE A SPECIFIC USER
router.put('/users/:id', (req, res) => {
  //pass in params below
  userController.updateUser();
});

// DESTROY A USER ACCOUNT
router.delete('/users/:id', (req, res) => {
  userController.deleteUser(req.params.id);
});


module.exports = router;
