// Require dependencies
const fs = require('fs');

/**
buildBookList()

arguments: array of book objects
returns: no return
outputs: writes file to /users/{userId}.txt

**/
const buildBookList = (userId, books) => {
  console.log('buildBookList called', userId, books);

  let booksDewey = books.slice().sort((a, b) => {
    if (a.dewey < b.dewey) {
      return -1;
    }

    if (a.dewey > b.dewey) {
      return 1;
    }

    return 0;

  });

  let booksTitle = books.slice().sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }

    if (a.title > b.title) {
      return 1;
    }

    return 0;

  });


  /** Create list sorted by title **/
  // create writable stream
  let streamTitle = fs.createWriteStream(__dirname +  `/../userFiles/${userId}_title.txt`);

  streamTitle.write('My Bookshelf\n\n');

  booksTitle.forEach((book, index) => {
    streamTitle.write(`\n${book.title} (DDC: ${book.dewey}) \n`);
    book.authors.forEach((author) => {
      streamTitle.write(`${author.firstName} ${author.firstName} \n`);
    });
  });
  streamTitle.write(` \n\n`);


  streamTitle.end();

  /** Create list sorted by dewey **/
  let streamDewey = fs.createWriteStream(__dirname +  `/../userFiles/${userId}_ddc.txt`);

  streamDewey.write('My Bookshelf\n\n');

  booksDewey.forEach((book, index) => {
    streamDewey.write(`\n${book.title} (DDC: ${book.dewey}) \n`);
    book.authors.forEach((author) => {
      streamDewey.write(`${author.firstName} ${author.lastName} \n`);
    });
  });
  streamDewey.write(` \n\n`);


  streamDewey.end();
};

module.exports = buildBookList;