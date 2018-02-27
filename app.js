const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const {userRoutes} = require('./routes/users');
const {apiRoutes} = require('./routes/api');

const app = express();

app.use('*', (req, res, next) => {
  console.log(`${req.method} request received for ${req.originalUrl}`);
  next();
});

app.use('/static', express.static(path.join(__dirname, 'node_modules', 'angular')));
app.use(express.static(path.join(__dirname, 'client')));

app.use('/static', userRoutes);
app.use('/users', userRoutes);
app.use('/api', apiRoutes);

app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});