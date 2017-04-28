const express = require('express');
const path = require('path');
const helmet = require('helmet');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy


// passport local strategy
const user = {
  username: 'user',
  password: 'password',
  id: 1
}

passport.use(new LocalStrategy(
  function(username, password, done) {
    findUser(username, function (err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false)
      }
      if (password !== user.password  ) {
        return done(null, false)
      }
      return done(null, user)
    })
  }
))









const app = express();

app.set('port', (process.env.PORT || 3001));

app.use(helmet());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());


app.get('/test', function(req, res) {
  console.log('==================')
  console.log('requesting /test');
  console.log('==================')
  res.json({
    'a': 'this is the result of /test'
  });
});

app.get('*', function (req, res) {
  console.log('made a request, any old request');
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
