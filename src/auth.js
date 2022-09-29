const base64 = require("base-64");

module.exports = function authMiddleware(req, res, next) {
  // Example Value: Basic YWRtaW46YWRtaW4=
  const authHeader = req.headers.authorization || '';
  // Example Value: YWRtaW46YWRtaW4=
  const encodedCredentials = authHeader.split(' ')[1] || '';
  // Example Value: admin:admin
  const decodedCredentials = base64.decode(encodedCredentials);
  // username: admin
  // password: admin
  const [username, password] = decodedCredentials.split(':');

  // Verify login and password are set and correct
  if (username === 'admin' && password === 'admin') {
    return next()
  }

  res.set('WWW-Authenticate', 'Basic realm="user_pages"');
  res.status(401).send('Authentication required.');
}
