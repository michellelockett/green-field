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
app.use(cors());
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
// app.use(bodyParser.json());


app.use('*', (req, res, next) => {
  console.log(`${req.method} request received for ${req.originalUrl}`);
  next();
});

//parsing middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, 'node_modules', 'angular')));
app.use(express.static(path.join(__dirname, 'client')));

app.use(session({ secret: "conanTheLibrarian",
                  savedUninitialized: true,
                  resave: true 
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => {
  res.send({ authenticated: true, userId: req.user.id, sessionId: req.sessionID});
});

app.get('/error', (req, res) => {
  res.send({ authenticated: false, message: "NOOOOOOO!"});
});

app.post('/signup', (req, res) => {
  userController.signup(req, res); 
});

app.post('/login', passport.authenticate('local', {successRedirect: '/success', failureRedirect: '/error'}), (req, res) => {
 
});

app.all("*", function(req, res, next){
  if (!req.user) 
    res.redirect('/error');
  else
    next();
});

app.use('/', routes);

app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});


