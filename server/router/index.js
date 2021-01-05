import express from 'express';

import user from '../modules/user.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Добро пожаловать!',
  });
});

router.post('/api/user/create', async (req, res) => {
  const result = await user.create(req.body);
  res.send(result);
});

export default router;

// server.post('/api/user/login', (req, res) => {
//   // const { username, password } = req.body;
//   // const user = findUser({ username });
//   // if (!user || !checkUserAuthenticated({ username, password })) {
//   //   const responseBody = createRejectResponse({
//   //     message: 'Incorrect username or password.',
//   //     code: 'NotAuthorizedException',
//   //   });
//   //   res.status(401).json(responseBody);
//   //   return;
//   // }
//   // const responseBody = createLoginAcceptResponse({ username, password, groups: user.groups });
//   // res.status(200).json(responseBody);
// });