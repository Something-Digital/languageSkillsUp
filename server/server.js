import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const port = 3001;

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.post('/api/user/create', (req, res) => {
  res.send('Hello World!');
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
