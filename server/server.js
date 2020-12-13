/* eslint-disable import/extensions */
import express from 'express';
import bodyParser from 'body-parser';

import user from './modules/user.js';

const PORT = process.env.PORT || 3001;

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.post('/api/user/create', async (req, res) => {
  const result = await user.create(req.body);
  res.send(result);
});

server.post('/api/user/login', (req, res) => {
  // const { username, password } = req.body;
  // const user = findUser({ username });
  // if (!user || !checkUserAuthenticated({ username, password })) {
  //   const responseBody = createRejectResponse({
  //     message: 'Incorrect username or password.',
  //     code: 'NotAuthorizedException',
  //   });
  //   res.status(401).json(responseBody);
  //   return;
  // }
  // const responseBody = createLoginAcceptResponse({ username, password, groups: user.groups });
  // res.status(200).json(responseBody);
});

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
