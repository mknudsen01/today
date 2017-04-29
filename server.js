const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const LocalStrategy = require('passport-local').Strategy
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');
const session = require('express-session');

var db = require('./db');

passport.use(new LocalStrategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  })
);

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }

    res.sendStatus(401);
  }
}

passport.authenticationMiddleware = authenticationMiddleware;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboards cat', resave: false, saveUninitialized: false }));
app.use(morgan('combined'));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// app.use(helmet());

app.set('port', (process.env.PORT || 3001));

app.use(express.static(path.join(__dirname, 'client/build')));




app.get('/test', function(req, res) {
  res.json({
    'a': 'this is the result of public /test'
  });
});

app.post('/logout', function(req, res){
  req.logout();
  res.json({
    a: 'logging you out'
  })
});

app.post('/login',
  function(req, res, next) {
    console.log('attempting log in');
    next();
  },
  passport.authenticate('local', { failureRedirect: '/login'}),
  function(req, res) {
    res.json({
      a: 'you logged in successfully'
    })
  }
);

app.get('/login', function(req, res) {
  res.json({
    a: 'you are in need of logging in'
  })
})

app.get('/auth',
  passport.authenticationMiddleware(),
  function(req, res) {
    res.json({
      a: 'you are logged in and can see logged in things.'
    })
  }
)

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
