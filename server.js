const express = require('express');
const app = express();
const isLoggedIn = require('./Middleware/auth');
const connectDB = require('./config/db');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');
var cors = require('cors');

connectDB();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.use(
  cookieSession({
    name: 'spotify-auth-session',
    keys: ['key1', 'key2'],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./routes/auth'));
app.use('/spotify', require('./routes/spotify'));

app.get('/', isLoggedIn, (req, res) => {
  res.json({
    success: true,
    message: 'user has successfully authenticated',
    user: req.user,
    cookies: req.cookies,
  });
});

app.listen(8000, () => {
  console.log('Server is up and running at the port 8000');
});
