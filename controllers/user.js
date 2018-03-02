const { User, Book, BookUsers } = require('../models/index');
const buildBookList = require('../helpers/files');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


const userController = {
  getUsers(req, res) {
    User.findAll()
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  postBookUser(req,res) {

  },

  login(req, res) {

    const username = req.body.username;
    const password = req.body.password;

    User.find({ where: { username: username}})
        .then((user) => {
          bcrypt.compare(password, user.hash)
                .then(response => {
                  if (response) {
                    res.send("you have permission to be logged in");
                  } else {
                    res.send("forbidden");
                  }
                });
        });
  },

  signup(req, res) {
    const password = req.body.password;
    const newUser = User.build({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.username
    });
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if (hash) {
          newUser.hash = hash;
        }

        User.find({ where: { username: req.body.username }})
            .then((user) => {
              if (user) { 
                res.send('This user already exists');
              } else {
                newUser.save()
                       .then((user) => {
                         res.send({name: user.firstName + ' ' + user.lastName, id: user.id});
                      });
              }
        });
      });      
    });
  },

  getUserWithBooks(req, res) {
    let userId = req.params.id;
    User.findById(userId, {
      include: [
        {
          model: Book
        }
      ]
    }).then((userBookData) => {
      // Rebuild a user's book list so it is
      // accessible if/when they request it
      buildBookList(userId, userBookData.books);

      // Send JSON to client
      res.json(userBookData);
    })
    .catch((err) => {
      console.log(err);
    });

  },
  getUserBookId(req,res) {

  },
  getUserBookList(req, res) {
    // Serve a simple test file
    // Refactor to serve the file in /users/
    // with the filename of the current user's ID
    res.download(`${__dirname}/../users/${req.params.id}.txt`, 'my_books.txt');
  },
  updateBook(req, res) {

  },
  deleteBook(req, res) {

  }
};

module.exports = userController;