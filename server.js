const express = require('express');
const app = express();
const isLoggedIn = require('./Middleware/auth');
const connectDB = require('./config/db');

connectDB();

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
