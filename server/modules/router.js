import express from 'express';

import user from './user.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Добро пожаловать!',
  });
});

router.post('/api/user/create', async (req, res) => {
  const result = await user.create(req.body);
  res.statusCode = result.ok ? 200 : 400;
  res.send(result);
});

router.post('/api/user/login', async (req, res) => {
  const result = await user.login(req.body);
  res.statusCode = result.ok ? 200 : 400;
  res.send(result);
});

export default router;
