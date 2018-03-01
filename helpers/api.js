// Require dependencies
const axios = require("axios");
const xml2js = require("xml2js");

// Require API key(s)
const { API_KEY } = require("../config/google");

/**

PLEASE READ:

The process for 'building' a book before saving is complex.
No single API can return all necessary data.
Likewise, each of the APIs used presents data in a confusing
manner.

All of the below functions are helper functions that are used in
buildBook(), at the end of this file.

**/

const lookupByISBN = isbn => {
  return axios.get(
    `http://classify.oclc.org/classify2/Classify?isbn=${isbn}&summary=true`
  );
};

const parseXML = response => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(response.data, (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(result);
    });
  });
};

const extractDDC = result => {
  let classifications = result.classify.recommendations[0].ddc[0].mostPopular;

  let dewey = null;

  classifications.forEach((item, index) => {
    if (item["$"].nsfa && item["$"].nsfa.includes(".")) {
      dewey = item["$"].nsfa;
    } else if (item["$"].sfa && item["$"].sfa.includes(".")) {
      dewey = item["$"].sfa;
    }
  });

  return dewey;

};

const getBookDetails = isbn => {
  return axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=isbn=${isbn}&key=${API_KEY}`
  );
};

const addDetailsToBook = (book, response) => {
  let bookData = response.data.items[0].volumeInfo;

  let formattedAuthors = bookData.authors.map((item, index) => {
    let splitName = item.split(' ');
    let firstName = splitName.shift();
    let lastName = splitName.join(' ');
    return {
      firstName,
      lastName
    };
  });


  // attach properties to book
  book.authors = formattedAuthors;
  book.title = bookData.title;
  book.description = bookData.description;
  book.pages = bookData.pageCount;
  book.published = bookData.publishedDate.substr(0, 4);
  book.format = bookData.printType;

  if (bookData['imageLinks'] && bookData['imageLinks']['thumbnail']) {
    book.cover = bookData.imageLinks.thumbnail;
  }

  book.categories = bookData.categories;
  return book;
};

const buildBook = isbn => {
  return new Promise((resolve, reject) => {
    let book = {};
    book.isbn = isbn;

    lookupByISBN(isbn)
      .then(response => {
        return parseXML(response);
      })
      .then(result => {
        book.dewey = extractDDC(result);
      })
      .then(() => {
        return getBookDetails(isbn);
      })
      .then(response => {
        return addDetailsToBook(book, response);
      })
      .then(book => {
        resolve(book);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = buildBook;
