const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('jwtSecret');

const isLoggedIn = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorisation Denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const accessToken = decoded.accessToken;
    req.user = { accessToken };
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
  next();
};
module.exports = isLoggedIn;
