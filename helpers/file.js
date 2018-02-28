// Require dependencies
const fs = require('fs');

/** 
buildBookList()

arguments: array of book objects
returns: no return
outputs: writes file to /users/{username}.txt 

**/
const buildBookList = (books) => {
  // create writable stream
  let stream = fs.createWriteStream(__dirname + 'username.txt');

  stream.write('My Bookshelf\n\n');

  userBookData.books.forEach((item, index) => {
    stream.write(`${book.title} (DDC: ${book.dewey}) \n`);
    stream.write(`${book.authors}\n\n`);
  });

  stream.end();
};

module.exports = buildBookList;