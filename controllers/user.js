const { User, Book, Author, BookUser } = require("../models/index");
const buildBookList = require("../helpers/files");

const userController = {
  getUsers(req, res) {
    User.findAll()
      .then(users => {
        res.send(users);
      })
      .catch(err => {
        res.send("Error");
      });
  },
  postBookUser(req, res) {},
  getUserWithBooks(req, res) {
    let userId = req.params.id;
    User.findById(userId, {
      include: [
        {
          model: Book,
          include: [
            {
              model: Author
            }
          ]
        }
      ]
    })
      .then(userBookData => {
        // Rebuild a user's book list so it is
        // accessible if/when they request it
        buildBookList(userId, userBookData.books);

        // Send JSON to client
        res.json(userBookData);
      })
      .catch(err => {
        console.log(err);
        res.send("Error");
      });
  },
  getUserBookId(req, res) {},
  getUserBookList(req, res) {
    // Serve a simple test file
    // Refactor to serve the file in /users/
    // with the filename of the current user's ID
    res.download(`${__dirname}/../users/${req.params.id}.txt`, "my_books.txt");
  },
  updateUserBook(req, res) {
    Book.update(
      {
        dewey: req.body.dewey
      },
      {
        where: {
          isbn: req.body.isbn
        }
      }
    )
      .then(book => {
        return BookUser.update(
          {
            owned: req.body.bookUser.owned,
            loaned: req.body.bookUser.loaned,
            notes: req.body.bookUser.notes
          },
          {
            where: {
              id: req.body.bookUser.id
            }
          }
        );
      })
      .then(bookUser => {
        res.send("Hello");
      })
      .catch(err => {
        res.send("Error");
      });
  },
  deleteBook(req, res) {}
};

module.exports = userController;
