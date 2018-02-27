const {User} = require('../models/user');
const {Book} = require('../models/book');
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
  getUserWithBooks(req, res) {

    console.log('fired');

    let userId = req.params.id;
    User.findById(userId, {
      include: [
        {
          model: Book
        }
      ]
    }).then((userBookData) => {
      res.json(userBookData);
    })
    .catch((err) => {
      console.log(err);
    })

  },
  getUserBookId(req,res) {

  },
  updateBook(req, res) {

  },
  deleteBook(req, res) {

  }
};

exports.userController = userController;