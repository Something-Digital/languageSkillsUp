import express from 'express';

import user from './user.js';

const router = express.Router();

router.post('/user/create', async (req, res) => {
  const result = await user.create(req.body);
  res.statusCode = result.ok ? 200 : 400;
  res.send(result);
});

router.post('/user/login', async (req, res) => {
  const result = await user.login(req.body);
  res.statusCode = result.ok ? 200 : 400;
  res.send(result);
});

router.get('/', (_, res) => {
  res.json({
    ok: true,
    message: 'I`m here!',
  });
});

router.get('/secret', user.auth, (_, res) => {
  res.json({
    ok: true,
    message: 'Secret message!',
  });
});

export default router;
