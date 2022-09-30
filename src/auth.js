const base64 = require("base-64");

function decodeCredentials(authHeader) {
  // authHeader: Basic YWRtaW46YWRtaW4=
  const encodedCredentials = authHeader
    .trim()
    .replace(/Basic\s+/i, '');

  const decodedCredentials = base64.decode(encodedCredentials);

  return decodedCredentials.split(':');
}

module.exports = function authMiddleware(req, res, next) {
  const [username, password] = decodeCredentials(req.headers.authorization || '');

  if (username === 'admin' && password === 'admin') {
    return next();
  }

  res.set('WWW-Authenticate', 'Basic realm="user_pages"');
  res.status(401).send('Authentication required.');
}
