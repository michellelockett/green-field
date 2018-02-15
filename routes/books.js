// routes for books (user agnostic)

// create a book
app.post('/books', (req, res) => {
  // direct to method in Books controller/model handler
  res.send('This will return an object containing a status message confirming creation of the specific book.');
});

// read all books
app.get('/books', (req, res) => {
  // direct to method in Books controller/model handler
  res.send('This will return an object containing a status message and a list of all books');
});

// read a specific book
app.get('/books/:id', (req, res) => {
  // direct to method in Books controller/model handler
  // passing :id from params
  res.send('This will return an object containing a status message and selected information for a specific book.');
});

// update a specific book
app.put('/books/:id', (req, res) => {
  // direct to method in Books controller/model handler
  // passing :id from params
  res.send('This will return an object containing a status message and updated information for a specific book.');
});

// destroy a book
app.delete('/books/:id', (req, res) => {
  // direct to method in Users controller/model handler
  // passing :id from params
  res.send('This will return an object containing a status message confirming deletion of the specific book.');
});

// routes for books (user-book relationships)

// create a book if doesn't exist
// and a user-book relationship
app.post('/users/:user_id/books', (req, res) => {
  // direct to method in Books controller/model handler
  res.send('This will return an object containing a status message confirming creation of the specific book and/or user-book relationship.');
});

// read all books associated with a user
app.get('/users/:user_id/books', (req, res) => {
  // direct to method in Books controller/model handler
  res.send('This will return an object containing a status message and a list of all books associated with current user');
});

// read a specific book associated with a user
// includes user notes, loan status, etc.
app.get('/users/:user_id/books/:book_id', (req, res) => {
  // direct to method in Books controller/model handler
  res.send('This will return an object containing a status message and a specific book associated with user.');
});

// update a specific book and
// update user-book relationship information (notes, loan status, etc.)
app.put('/users/:user_id/books/:book_id', (req, res) => {
  // direct to method in Books controller/model handler
  // passing :id from params
  res.send('This will return an object containing a status message and updated information for a specific book.');
});

// destroy association between user and book
app.delete('/users/:user_id/books/:book_id', (req, res) => {
  // direct to method in Users controller/model handler
  // passing :id from params
  res.send('This will return an object containing a status message confirming deletion of relationship of user and the specific book.');
});
