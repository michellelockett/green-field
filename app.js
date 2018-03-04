const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/routes');
const userController = require('./controllers/user');
const cookieParser = require('cookie-parser');

const app = express();

//CORS middleware
app.use(cors());

//LOGGING middleware
app.use('*', (req, res, next) => {
  console.log(`${req.method} request received for ${req.originalUrl}`);
  next();
});

//PARSING middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//SERVE static files
app.use('/static', express.static(path.join(__dirname, 'node_modules', 'angular')));
app.use(express.static(path.join(__dirname, 'client')));

//CONFIGURE session
app.use(session({ secret: "conanTheLibrarian",
                  savedUninitialized: true,
                  resave: true 
}));

//INITIALIZE authentication
app.use(passport.initialize());
app.use(passport.session());

//HELPER SUCCESS ROUTE FOR CONFIRMING LOGIN
app.get('/success', (req, res) => {
  res.send({ authenticated: true, userId: req.user.id, sessionId: req.sessionID});
});

//HELPER ERROR ROUTE FOR PROTECTING ROUTES
app.get('/error', (req, res) => {
  res.send({ authenticated: false});
});

//SIGNUP a new user
app.post('/signup', (req, res) => {
  userController.signup(req, res); 
});

//LOGIN route, passport authenticated with redirect
app.post('/login', passport.authenticate('local', {successRedirect: '/success', failureRedirect: '/error'}), (req, res) => {});

//LOGOUT route
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

//Check to make sure any other request is coming from a logged in user
app.all("*", function(req, res, next){
  if (!req.user) 
    res.redirect('/error');
  else
    next();
});

//If a user is logged in, pass the request to the routes
app.use('/', routes);

app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});


