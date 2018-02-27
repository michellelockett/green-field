// Require dependencies
const axios = require("axios");
const xml2js = require("xml2js");
// Require API key(s)
const { API_KEY } = require("../config/google");

/** 

READ THIS 

The process for 'building' a book before saving is complex.
No single API can return all necessary data.
Likewise, each of the APIs used presents data in a confusing
manner.

**/


const lookupByISBN = isbn => {
  return axios.get(
    `http://classify.oclc.org/classify2/Classify?oclc=57358293&summary=true`
  );
};

const parseXML = response => {
  return new Promise((resolve, reject) => {
    console.log(response.data);
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
  classifications.forEach((item, index) => {
    if (item["$"].nsfa && item["$"].nsfa.includes(".")) {
      console.log("DDC FOUND!", item["$"].nsfa);
      return item["$"].nsfa;
    } else if (item["$"].sfa && item["$"].sfa.includes(".")) {
      console.log("DDC FOUND!", item["$"].sfa);
      return item["$"].sfa;
    } else {
      return "unavailable";
    }
  });
};

const getBookDetails = isbn => {
  return axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=isbn=${isbn}&key=${API_KEY}`
  );
};

const addDetailsToBook = (book, response) => {
  console.log(response);
  let bookData = response.data.items[0].volumeInfo;

  // attach properties to book
  book.title = bookData.title;
  book.description = bookData.description;
  book.pages = bookData.pageCount;
  book.format = bookData.printType;
  book.cover = bookData.imageLinks.thumbnail;

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
        book.ddc = extractDDC(result);
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
