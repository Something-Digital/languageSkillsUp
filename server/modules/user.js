import bcrypt from 'bcrypt';

import db from './db.js';
import token from './token.js';
import { ID_KEY, ID_EXPIRES_IN, REFRESH_EXPIRES_IN } from './constants.js';

const user = {
  create: async (userData) => {
    const result = {
      ok: false,
      message: 'Couldn`t create a user',
    };

    const { username, password, repeatPassword } = userData;

    if (!username) {
      result.message += ': username is empty';
      return result;
    }

    if (!password) {
      result.message += ': password is empty';
      return result;
    }

    if (!repeatPassword) {
      result.message += ': repeat password is empty';
      return result;
    }

    if (password.trim() !== repeatPassword.trim()) {
      result.message += ': password and its repeat aren`t match';
      return result;
    }

    const userExists = await db.ifUserExists({ username });
    if (userExists) {
      result.message += ': the user is already exists';
      return result;
    }

    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    const userId = await db.writeNewUser({ username, passwordHash });

    if (userId) {
      result.ok = true;
      result.message = `User ${username} created!`;
      result.data = { userId, username };
    }

    return result;
  },

  login: async (userData) => {
    const result = {
      ok: false,
      message: 'Couldn`t login a user',
    };

    const { username, password } = userData;

    if (!username) {
      result.message += ': username is empty';
      return result;
    }

    if (!password) {
      result.message += ': password is empty';
      return result;
    }

    const { passwordHash } = await db.getUser({ username });
    const isPasswordCorrect = bcrypt.compareSync(password, passwordHash);
    if (!isPasswordCorrect) {
      result.message += ': username or password is incorrect';
      return result;
    }

    const idToken = token.createIdToken({ username, password });
    const refreshToken = token.createRefreshToken({ username, password });

    result.ok = true;
    result.message = `User ${username} logged in!`;
    result.data = {
      auth: {
        idToken,
        refreshToken,
        idExpiresIn: ID_EXPIRES_IN,
        refreshExpiresIn: REFRESH_EXPIRES_IN,
      },
      groups: ['USER'],
    };

    return result;
  },

  auth: async (req, _, next) => {
    try {
      const tokenOk = token.verifyToken(req.headers.authorization, ID_KEY);

      if (tokenOk) {
        next();
      } else {
        const err = new Error('Not authenticated!');
        err.status = 401;
        next(err);
      }
    } catch (err) {
      next(err);
    }
  },
};

export default user;
