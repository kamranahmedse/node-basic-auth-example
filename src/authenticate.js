const base64 = require("base-64");

module.exports = function authMiddleware(req, res, next) {
  const authHeader = (req.headers.authorization || '').split(' ')[1] || '';
  const [username, password] = base64.decode(authHeader).split(':');

  // Verify login and password are set and correct
  if (username === 'admin' && password === 'admin') {
    return next()
  }

  res.set('WWW-Authenticate', 'Basic realm="user_pages"');
  res.status(401).send('Authentication required.');
}
