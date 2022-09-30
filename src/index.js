const express = require('express');
const authMiddleware = require('./auth');

const app = express();
const port = 3000;

app.use(authMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App running @ http://localhost:${port}`);
})
