//routes for users of the book app interacting with the server

// create a user
app.post('/users', (req, res) => {
  // direct to method in Users controller/model handler
});

// read all users
// note: may be deprecated
app.get('/users', (req, res) => {
  // direct to method in Users controller/model handler
});

// read a specific user
app.get('/users/:id', (req, res) => {
  // direct to method in Users controller/model handler
  // passing :id from params
});

// update a specific user
app.put('/users/:id', (req, res) => {
  // direct to method in Users controller/model handler
  // passing :id from params
});

// destroy a user account
// note: may be deprecated
app.delete('/users/:id', (req, res) => {
  // direct to method in Users controller/model handler
  // passing :id from params
});

// logout
app.post('/logout', (req, res) => {
  // direct to method in Users (or Authentication) controller/modle handler
});
