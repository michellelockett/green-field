// Require dependencies
const fs = require('fs');

/** 
buildBookList()

arguments: array of book objects
returns: no return
outputs: writes file to /users/{userId}.txt 

**/
const buildBookList = (userId, books) => {
  // create writable stream
  let stream = fs.createWriteStream(__dirname +  `/../users/${userId}.txt`);

  stream.write('My Bookshelf\n\n');

  userBookData.books.forEach((item, index) => {
    stream.write(`${book.title} (DDC: ${book.dewey}) \n`);
    stream.write(`${book.authors}\n\n`);
  });

  stream.end();
};

module.exports = buildBookList;