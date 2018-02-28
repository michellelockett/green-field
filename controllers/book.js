const {User, Book, BookUsers, Author} = require('../models/index');
const buildBook = require('../helpers/api');

const bookController = {
  postBook(req,res) {

    // see if book already exists in database
    // and if so, just add association
    Book.findOne({where: {isbn: req.params.isbn}})
      .then((book) => {
        if (book) {
          // If book already exists in database,
          // just create an association between book & user
          User.findById(req.params.id).then((user) => {
            book.addUser(user);
            res.json(book);
          });

        } else {
          // If book does not exist in database,
          // create book & add association with user
          buildBook(req.params.isbn)
          .then((book) => {

            Book.create(book, {
              include: [ Author]
            }).then((book) => {

              User.findById(req.params.id).then((user) => {
                book.addUser(user);
                res.json(book);
              });

            });

          })
          .catch((err) => {
            console.log(err);
            res.send("Error", err);
          })
        }
      })
      .catch((err) => {
        res.send("ERROR: We encountered an error while seeing if that book has already been saved.");
      });
    }
  };

module.exports = bookController;