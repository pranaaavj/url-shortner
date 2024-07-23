const express = require('express');
const app = express();

app.get('/', (req, res) => {
  // res.set('Content-Type', 'text/html');
  res.send('hello from server');
});

app.listen(3000, () => {
  console.log('hey there');
});
