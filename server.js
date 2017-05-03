const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('./auth');
var db = require('./db/models');

// force: true will DROP THE ENTIRE DATABASE whenever you restart the server
// it is useful for development while you're trying to nail down your schema.
// but once you're happy with the schema, stop using this and instead use
// migrations. use the sequelize sql log and create migrations with it.
if (process.env.NODE_ENV !== "production") {
  db.sequelize.sync({force: true, logging: console.log});
}

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
  passport.authenticate('local', { failureRedirect: '/login'}),
  function(req, res) {
    res.status(200);
    res.json({
      user: req.user,
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
