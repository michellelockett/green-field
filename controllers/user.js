const {User} = require('../models/user');
const {Book} = require('../models/book');
const {Author} = require('../models/author');
const {BookAuthors} = require('../models/bookAuthors');
const {BookGenres} = require('../models/bookGenres');
const {BookUsers} = require('../models/bookUsers');

const userController = {
  getUsers(req, res) {
    User.findAll()
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  postBookUser(req,res) {

  },
  getUserBooks(req, res) {

  },
  getUserBookId(req,res) {

  },
  updateBook(req, res) {

  },
  deleteBook(req, res) {

  }
};

exports.userController = userController;