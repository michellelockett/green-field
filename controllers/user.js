const { User, Book, Author, BookUser } = require('../models/index');
const buildBookList = require('../helpers/files');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const userController = {
  createNewUser(req, res) {
    User
      .findOrCreate({where: {firstName: req.body.firstName, lastName: req.body.lastName, userName: req.body.userName, password: req.body.password}})
      .spread((user, create) => {
        console.log(user.get({
          plain: true
        }));
      });
  },
  getUsers(req, res) {
    User.findAll()
      .then(users => {
        res.send(users);
      })
      .catch(err => {
        res.send("Error");
      });
  },

  postBookUser(req, res) {},

  getUsersId(req, res) {
    User.findAll({where: { id : req.params.id}})
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        console.log(err);
      });
  },

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

  updateUserId(req, res) {
  // what exactly was supposed to be updated here
  // currently will update any data passed in put request for specific user id
    User.update({firstName: req.body.firstName, lastName: req.body.lastName, userName: req.body.userName, password: req.body.password}, { where: {id: req.params.id}})
      .then(user => {
        console.log(user);
    });
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
  postBookUser(req,res) {
  // trying to use add methods that should be available with the belongsToMany associations
  //User.addBook(Book, {where: {id: req.params.id} } )
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
  // getUserBookId(req,res) {

  //       // Send JSON to client
  //       res.json(userBookData);

  //     .catch(err => {
  //       console.log(err);
  //       res.send("Error");
  //     });
  // },

  // getUserBookId(req, res) {},

  getUserBookList(req, res) {
    // Serve a simple test file
    // Refactor to serve the file in /users/
    // with the filename of the current user's ID
    res.download(`${__dirname}/../users/${req.params.id}.txt`, "my_books.txt");
  },
  updateUserBook(req, res) {
    Book.update(
      {
        dewey: req.body.dewey
      },
      {
        where: {
          isbn: req.body.isbn
        }
      }
    )
      .then(book => {
        return BookUser.update(
          {
            owned: req.body.bookUser.owned,
            loaned: req.body.bookUser.loaned,
            notes: req.body.bookUser.notes
          },
          {
            where: {
              id: req.body.bookUser.id
            }
          }
        );
      })
      .then(bookUser => {
        res.send("Hello");
      })
      .catch(err => {
        res.send("Error");
      });
  },
  deleteBook(req, res) {}
};

module.exports = userController;
