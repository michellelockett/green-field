const {User, Book, BookUsers} = require('../models/index');
const buildBookList = require('../helpers/files');

const userController = {
  createNewUser(req, res) {
    User
      .findOrCreate({where: {firstName: req.body.firstName, lastName: req.body.lastName, userName: req.body.userName, password: req.body.password}})
      .spread((user, create) => {
        console.log(user.get({
          plain: true
        }))
      })
  },
  getUsers(req, res) {
    User.findAll()
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getUsersId(req, res) {
    User.findAll({where: { id : req.params.id}})
      .then((user) => {
        res.send(user);
      }) 
      .catch((err) => {
        console.log(err);
      });
  },
  updateUserId(req, res) {
  // what exactly was supposed to be updated here
  // currently will update any data passed in put request for specific user id
    User.update({firstName: req.body.firstName, lastName: req.body.lastName, userName: req.body.userName, password: req.body.password}, { where: {id: req.params.id}})
      .then(user => {
        console.log(user)
    })
  }, 
  deleteUser(req, res) {
    User.destroy({where: { id: req.params.id}})
      .then(user => {
        res.send(user)
      })
      .catch(err => {
        console.log(err)
      });
  },
  postBookUser(req,res) {
  // trying to use add methods that should be available with the belongsToMany associations
  //User.addBook(Book, {where: {id: req.params.id} } )
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
    })

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