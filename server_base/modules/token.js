import jwt from 'jsonwebtoken';
import {
  ID_KEY,
  REFRESH_KEY,
  ID_EXPIRES_IN,
  REFRESH_EXPIRES_IN,
} from './constants.js';

const token = {
  createIdToken: (payload) => jwt.sign(
    payload,
    ID_KEY,
    {
      expiresIn: ID_EXPIRES_IN,
    },
  ),

  createRefreshToken: (payload) => jwt.sign(
    payload,
    REFRESH_KEY,
    {
      expiresIn: REFRESH_EXPIRES_IN,
    },
  ),

  verifyToken: (tokenValue, key) => {
    try {
      const decoded = jwt.verify(
        tokenValue,
        key,
        (err, decode) => (decode !== undefined ? decode : err),
      );
      return !(decoded && ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'].includes(decoded.name));
    } catch (err) {
      return false;
    }
  },
};

export default token;
