const express = require('express');
const path = require('path');
const helmet = require('helmet');
const session = require('express-session');


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
