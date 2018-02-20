const {Book} = require('../models/book');
const axios = require('axios');
const xml2js = require('xml2js');
const {API_KEY} = require('../config/google');

const apiController = {
  getBookData(isbn, res) {

    // declare book object to hold the results of successive API calls
    let book = {};

    axios.get(`http://classify.oclc.org/classify2/Classify?oclc=57358293&summary=true`)
    .then((response) => {
      // convert xml to json
      xml2js.parseString(response.data, (err, result) => {
        if (err) {
          console.log("Error: ", err);
        }
        // assign precise Dewey Decimal # to book object

        /**
        Classify API is inconsistent in number of classifications
        or order. The precise location of the DDC may change from one API call to
        next.

        The below function:
        1. iterates through each of the 'mostPopular' classification objects
        2. it accesses the 'nsfa' and 'sfa' properties of each
        3. once it locates a property that is a string number containing a decimal,
        it stops and records that as the dewey classification.
        4. if no dewey classification is located, 'unavailable' is assigned to DDC.
        **/

        const extractDDC = () => {
          let classifications = result.classify.recommendations[0].ddc[0].mostPopular;
          classifications.forEach((item, index) => {
            if (item['$'].nsfa && item['$'].nsfa.includes('.')) {
              console.log('DDC FOUND!', item['$'].nsfa);
              return item['$'].nsfa;
            } else if (item['$'].sfa && item['$'].sfa.includes('.')) {
              console.log('DDC FOUND!', item['$'].sfa);
              return item['$'].sfa;
            } else {
              return 'unavailable';
            }

          });
        };

        // result.classify.recommendations[0].ddc[0].mostPopular[1]['$'].nsfa

        book.ddc = extractDDC();
        // console.log(result.classify.recommendations[0].ddc[0].mostPopular);
      });
    })
    .then((jsonData) => {
      // make a subsequent API call to Google Books API
      return axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn=${isbn}&key=${API_KEY}`);
    })
    .then((response) => {
      // variable to hold data from first returned book
      // that matches ISBN
      let bookData = response.data.items[0].volumeInfo;

      // attach properties to book
      book.isbn = isbn;
      book.title = bookData.title;
      book.authors = bookData.authors;
      book.published = bookData.publishedDate;
      book.description = bookData.description;
      book.pages = bookData.pageCount;
      book.format = bookData.printType;
      book.genre = bookData.categories;
      book.cover = bookData.imageLinks.thumbnail;

      // send book object back to client
      res.send(book);
    })
    .catch((err) => {
      // console.log('getBookData ERROR: ', err);
    })

  }
};

exports.apiController = apiController;