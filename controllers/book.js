const {User, Book, BookUser, Author} = require('../models/index');
const buildBook = require('../helpers/api');

const bookController = {
  postBook(req,res) {

    // see if book already exists in database
    // and if so, just add association
    Book.find({
      where: {
        isbn: req.params.isbn,
      },
      include: Author
    })
      .then((book) => {

        if (book) {
          // If book already exists in database,
          // just create an association between book & user
          User.findById(req.params.id).then((user) => {
            book.addUser(user, { through: { owned: req.params.owned}});
            res.json(book);
          });

        } else {
          // If book does not exist in database,
          // create book & add association with user
          buildBook(req.params.isbn)
          .then((book) => {
            console.log("BUILT BOOK: ", book);

            Book.create(book, {
              include: [ Author ]
            }).then((book) => {

              User.findById(req.params.id).then((user) => {
                book.addUser(user, { through: { owned: req.params.owned}});
                res.json(book);
              });

            });

          })
          .catch((err) => {
            //console.log(err);
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