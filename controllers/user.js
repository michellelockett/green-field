const {User, Book, BookUsers} = require('../models/index');
const buildBookList = require('../helpers/files');

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
    let userId = req.params.id;
    User.findById(userId, {
      include: [
        {
          model: Book
        }
      ]
    }).then((userBookData) => {
      // Rebuild a user's book list so it is 
      // accessible if/when they request it
      buildBookList(userBookData.books);

      // Send JSON to client
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

module.exports = userController;