/* eslint-disable import/extensions */
import express from 'express';
import bodyParser from 'body-parser';

import router from './modules/router.js';

const PORT = process.env.PORT || 3001;

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use('/', router);

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
