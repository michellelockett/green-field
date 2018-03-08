// Require dependencies
const axios = require('axios');
const xml2js = require('xml2js');
const _ = require('lodash');

// Require API key(s)
const API_KEY = require('../config/google');

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
  return new Promise((resolve, reject) => {
    if (
      result.classify.recommendations &&
      result.classify.recommendations &&
      result.classify.recommendations[0].ddc
    ) {
      let classifications =
        result.classify.recommendations[0].ddc[0].mostPopular;

      classifications.forEach((item, index) => {
        if (item['$'].nsfa) {
          resolve(item['$'].nsfa);
        } else if (item['$'].sfa) {
          resolve(item['$'].sfa);
        } else {
          resolve(null);
        }
      });
    }

    resolve(null);

    reject();
  });
};

const getBookDetails = isbn => {
  return axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${API_KEY}`
  );
};

const addDetailsToBook = (book, response) => {
  let bookData = null;

  if (
    response.data.items &&
    response.data.items[0] &&
    response.data.items[0].volumeInfo
  ) {
    bookData = response.data.items[0].volumeInfo;
    let formattedAuthors = null;
    console.log(bookData.authors);
    if (bookData && bookData.authors) {
      formattedAuthors = bookData.authors.map((item, index) => {
        let splitName = item.split(' ');
        let firstName = splitName.shift();
        let lastName = splitName.join(' ');
        return {
          firstName,
          lastName
        };
      });
    }
    // attach properties to book
    book.found = true;
    book.authors = formattedAuthors;
    book.title = _.get(bookData, `title`, "Unknown")

    book.description = bookData.description;
    book.pages = bookData.pageCount;

    if (bookData.publishedDate) {
      book.published = bookData.publishedDate.substr(0, 4);
    }
    book.format = bookData.printType;

    // if (bookData['imageLinks'] && bookData['imageLinks']['thumbnail']) {
    //   book.cover = bookData.imageLinks.thumbnail;
    // }

    book.cover =  _.get(bookData, `imageLinks.thumbnail`, "Unknown")
  } else {
    book.found = false;
  }

  return book;
};

const buildBook = isbn => {
  return new Promise((resolve, reject) => {
    let book = {
      isbn: isbn || 'Unknown',
      authors: 'Unknown',
      title: 'Unknown',
      pages: 'Unknown',
      published: 'Unknown',
      cover: 'Unknown',
      dewey: 'Unknown'
    };

    lookupByISBN(isbn)
      .then(response => {
        return parseXML(response);
      })
      .then(result => {
        extractDDC(result).then(ddc => {
          book.dewey = ddc;
        });
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
