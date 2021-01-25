import { ID_EXPIRES_IN } from 'constants';
import { createIdToken, createRefreshToken } from './token';

export function createLoginAcceptResponse({ username, password, groups }) {
  const IdToken = createIdToken({ username, password });
  const RefreshToken = createRefreshToken({ username, password });
  return {
    IdToken,
    RefreshToken,
    ExpiresIn: ID_EXPIRES_IN,
    groups,
  };
}

export function createRefreshAcceptResponse() {
  const IdToken = createIdToken({});
  return {
    IdToken,
    ExpiresIn: ID_EXPIRES_IN,
  };
}

export function createRejectResponse({ message, code }) {
  return {
    error: {
      message,
      code,
      time: (new Date()).toISOString(),
      statusCode: 400,
      retryable: false,
    },
  };
}