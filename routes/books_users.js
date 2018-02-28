/** ROUTES FOR BOOK-USER RELATIONSHIP ACTIONS**/
const express = require('express')
const router = express.Router()
const { userController } = require('../controllers/user');
const { bookController } = require('../controllers/book');

// CREATE book if it doesn't exist already
// and a user-book relationship
router.post('/users/:user_id/books/isbn/:isbn', (req, res) => {
  // direct to method in Books controller/model handler
  bookController.postBook(req, res);
});

// READ all books associated with a given user
router.get('/users/:user_id/books', (req, res) => {
  // direct to method in Books controller/model handler
  // userController.getUserBooks(req, res);
});

// READ a specific book associated with a given user
// includes user notes, loan status, etc.
router.get('/users/:user_id/books/:book_id', (req, res) => {
  // direct to method in Books controller/model handler
  // userController.getUserBookId(req, res);
});

// UPDATE a specific book and user-book
// relationship information (notes, loan status, etc.)
router.put('/users/:user_id/books/:book_id', (req, res) => {
  // direct to method in Books controller/model handler
  // passing :id from params
  // userController.updateBook(req, res);
});

// DESTROY association between user and book
// but not book itself
router.delete('/users/:user_id/books/:book_id', (req, res) => {
  // direct to method in Users controller/model handler
  // passing :id from params
  // userController.deleteBook(req, res);
});
