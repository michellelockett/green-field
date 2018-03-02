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

  login(req, res) {
    console.log(req.body);
    res.send("You are in the login route");
  },

  signup(req, res) {
    console.log(req.body);
    // const password = req.body.password;

    // const newUser = User.build({
    //   firstName: req.body.firstName,
    //   lastName: req.body.lastName,
    //   userName: req.body.userName
    // });

    res.send("You are in the signup route");

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
      buildBookList(userId, userBookData.books);

      // Send JSON to client
      res.json(userBookData);
    })
    .catch((err) => {
      console.log(err);
    });

  },
  getUserBookId(req,res) {

  },
  getUserBookList(req, res) {
    // Serve a simple test file
    // Refactor to serve the file in /users/
    // with the filename of the current user's ID
    res.download(`${__dirname}/../users/${req.params.id}.txt`, 'my_books.txt');
  },
  updateBook(req, res) {

  },
  deleteBook(req, res) {

  }
};

module.exports = userController;