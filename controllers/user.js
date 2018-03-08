const { User, Book, Author, BookUser } = require('../models/index');
const buildBookList = require('../helpers/files');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const userController = {

  getUserByUsername(username, callback) {
    User.find({ where: { userName: username }})
        .then((user) => callback(null, user));
  },

  getUserById(id, callback) {
    User.find({ where: { id: id}})
        .then(user => {
          if (user) {
            callback(null, user);
          }
        });
  },

  getUserWithBooks(req, res) {
    let userId = req.params.id;
    User.findById(userId, {
      include: [
        {
          model: Book,
          include: [
            {
              model: Author
            }
          ]
        }
      ]
    })

      .then(userBookData => {
        // Rebuild a user's book list so it is
        // accessible if/when they request it
        buildBookList(userId, userBookData.books);
        res.json(userBookData);
    })

    .catch((err) => {
      console.log(err);
    });

  },

  // Serve a simple test file
  // Refactor to serve the file in /users/
  // with the filename of the current user's ID

  getUserBookList(req, res) {
    res.download(`${__dirname}/../userFiles/${req.params.id}_${req.params.list_type}.txt`, "my_books.txt");
  },

  updateUserBook(req, res) {

    Book.update({
      dewey: req.body.dewey,
      title: req.body.title
    },
    {
      where: {
        isbn: req.body.isbn
      }
    }).then(book => {
      return BookUser.update({
        owned: req.body.bookUser.owned,
        notes: req.body.bookUser.notes,
        loaned: req.body.bookUser.loaned
      },
      {
        where: {
          id: req.body.bookUser.id
        }
      });
      })
      .then(bookUser => {
        res.send("Hello");
      })
      .catch(err => {
        res.send("Error");
      });
  },

  comparePassword(password, hash, callback) {
    bcrypt.compare(password, hash)
          .then(response => {
            if (response) {
              callback(null, response);
            } else {
              callback(response, null);
            }
          })
          .catch(err => console.log(err));
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
                res.send({registered: false, message: 'This username is taken'});

              } else {
                newUser.save()
                       .then((user) => {
                         res.send({registered: true, name: user.firstName + ' ' + user.lastName, id: user.id});
                      });
              }
            });
        });
      });
  },


  updateUser(req, res) {
    //TODO:  modify the user data, firstname, lastname, or password value
  },

  deleteUser(req, res) {
    User.destroy({where: { id: req.params.id}})
      .then(user => {
        res.send(user);
      })
      .catch(err => {
        console.log(err);
      });
  },

  deleteBookFromUser(req, res) {
    BookUser.destroy({
      where: {
        id: req.params.record_id
      }
    }).then(() => {
      res.send("Success");
    }).catch((err) => {
      res.send("Error");
    })
  }
};

module.exports = userController;
