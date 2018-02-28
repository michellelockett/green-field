const {Author} = require('../models/index');

const buildBook = require('../helpers/api');

const authorController = {
  saveAuthor({firstName, lastName}) {
    return Author.findOrCreate({where: {firstName, lastName}});
  }
};

// authorController.saveAuthor()
// .then((author) => {
//   author.addBook(**BOOK**);
// });

exports.bookController = bookController;