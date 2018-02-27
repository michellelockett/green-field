/** USER-AGNOSTIC ROUTES FOR BOOKS **/
/** These are commented out as they may be deprecated in whole or part **/

// create a book
app.post('/books', (req, res) => {
  // direct to method in Books controller/model handler
  res.send('This will return an object containing a status message confirming creation of the specific book.');
});

// // read all books
// app.get('/books', (req, res) => {
//   // direct to method in Books controller/model handler
//   res.send('This will return an object containing a status message and a list of all books');
// });

// // read a specific book
// app.get('/books/:id', (req, res) => {
//   // direct to method in Books controller/model handler
//   // passing :id from params
//   res.send('This will return an object containing a status message and selected information for a specific book.');
// });

// // update a specific book
// app.put('/books/:id', (req, res) => {
//   // direct to method in Books controller/model handler
//   // passing :id from params
//   res.send('This will return an object containing a status message and updated information for a specific book.');
// });

// // destroy a book
// app.delete('/books/:id', (req, res) => {
//   // direct to method in Users controller/model handler
//   // passing :id from params
//   res.send('This will return an object containing a status message confirming deletion of the specific book.');
// });
