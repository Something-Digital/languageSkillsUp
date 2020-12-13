import jwt from 'jsonwebtoken';
import {
  ID_KEY,
  REFRESH_KEY,
  ID_EXPIRES_IN,
  REFRESH_EXPIRES_IN,
} from 'constants';

export function createIdToken(payload) {
  return jwt.sign(payload, ID_KEY, { expiresIn: ID_EXPIRES_IN });
}

export function createRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_KEY, { expiresIn: REFRESH_EXPIRES_IN });
}

export function verifyToken(token, key) {
  try {
    const decoded = jwt.verify(token, key, (err, decode) => (decode !== undefined ? decode : err));
    return !(decoded && ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'].includes(decoded.name));
  } catch (err) {
    return false;
  }
}
