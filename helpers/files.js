// Require dependencies
const fs = require('fs');

/**
buildBookList()

arguments: array of book objects
returns: no return
outputs: writes file to /users/{userId}.txt

**/
const buildBookList = (userId, books) => {
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

  let booksAuthor = books.slice().sort((a, b) => {
    let nameA =
      a.authors[0].lastName !== null
        ? a.authors[0].lastName.toUpperCase()
        : null;
    let nameB =
      b.authors[0].lastName !== null
        ? b.authors[0].lastName.toUpperCase()
        : null;
    if (nameA === undefined || nameA === null) {
      return 2;
    }
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  /** Create list sorted by title **/
  // create writable stream
  let streamTitle = fs.createWriteStream(
    __dirname + `/../userFiles/${userId}_title.txt`
  );

  streamTitle.write('My Bookshelf\n\n');

  booksTitle.forEach((book, index) => {
    streamTitle.write(`\n${book.title} (DDC: ${book.dewey}) \n`);
    book.authors.forEach(author => {
      streamTitle.write(`${author.firstName} ${author.lastName} \n`);
    });
  });
  streamTitle.write(` \n\n`);

  streamTitle.end();

  /** Create list sorted by dewey **/
  let streamDewey = fs.createWriteStream(
    __dirname + `/../userFiles/${userId}_dewey.txt`
  );

  streamDewey.write('My Bookshelf\n\n');

  booksDewey.forEach((book, index) => {
    streamDewey.write(`\n${book.title} (DDC: ${book.dewey}) \n`);
    book.authors.forEach(author => {
      streamDewey.write(`${author.firstName} ${author.lastName} \n`);
    });
  });
  streamDewey.write(` \n\n`);

  streamDewey.end();

  /** Create list sorted by author last name **/
  let streamAuthor = fs.createWriteStream(
    __dirname + `/../userFiles/${userId}_author.txt`
  );

  streamAuthor.write('My Bookshelf\n\n');

  booksAuthor.forEach((book, index) => {
    streamAuthor.write(`\n${book.title} (DDC: ${book.dewey}) \n`);
    book.authors.forEach(author => {
      streamAuthor.write(`${author.firstName} ${author.lastName} \n`);
    });
  });
  streamAuthor.write(` \n\n`);

  streamAuthor.end();
};

module.exports = buildBookList;
