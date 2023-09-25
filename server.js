const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const pathMatch = require('path-match');
const app = next({ dev });
const handle = app.getRequestHandler();
const { parse } = require('url');

const userRoutes = require('./routes/users.js');

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  
  server.use('/users', userRoutes);

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.post("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log('Server ready on http://localhost:3000');
  });
});