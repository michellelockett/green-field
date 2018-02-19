const {Book} = require('../models/book');
const axios = require('axios');
const xml2js = require('xml2js');
const {API_KEY} = require('../config/google');

const apiController = {
  getBookData(req, res) {
    axios.get(`http://classify.oclc.org/classify2/Classify?oclc=57358293&summary=true`)
    .then((response) => {
      // convert xml to json
      xml2js.parseString(response.data, (err, result) => {
        if (err) {
          console.log("Error: ", err);
        }

        // let ddc = result.classify.recommendations[0].ddc[0].mostPopular[1]['$'].nsfa;
        console.log(result.classify.work.author);
        console.log(result.classify.work.author);
        console.log(result.classify.work.author);

// https://www.googleapis.com/books/v1/volumes?q=search+terms


      });
    })
    .then((jsonData) => {
      return axios.get(`https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=${API_KEY}`);
    })
    .then((response) => {
      // do something with JSON data
      console.log(response.data);
    })
    .catch((err) => {
      console.log('getBookData ERROR: ', err);
    })

  }
};

exports.apiController = apiController;