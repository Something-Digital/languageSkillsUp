import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const port = 3001;

const ID_KEY = '123456789';
const REFRESH_KEY = '987654321';
const idExpiresIn = 3600;
const refreshExpiresIn = 3600 * 24;

function createIdToken(payload) {
  return jwt.sign(payload, ID_KEY, { expiresIn: idExpiresIn });
}

function createRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_KEY, { expiresIn: refreshExpiresIn });
}

function createLoginAcceptResponse({ username, password, groups }) {
  const IdToken = createIdToken({ username, password });
  const RefreshToken = createRefreshToken({ username, password });
  return {
    IdToken,
    RefreshToken,
    ExpiresIn: idExpiresIn,
    groups,
  };
}

function createRefreshAcceptResponse() {
  const IdToken = createIdToken({});
  return {
    IdToken,
    ExpiresIn: idExpiresIn,
  };
}

function createRejectResponse({ message, code }) {
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

function verifyToken(token, key) {
  try {
    const decoded = jwt.verify(token, key, (err, decode) => (decode !== undefined ? decode : err));
    return !(decoded && ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'].includes(decoded.name));
  } catch (err) {
    return false;
  }
}

function findUser({ username }) {
  // @TODO
  // const userRecord = findUserRecord({ username });
  // return userRecord ? userRecord.value() : null;
}

function updateUser({ username, ...otherProps }) {
  // @TODO
  // const userRecord = findUserRecord({ username });
  // if (userRecord) {
  //   userRecord.assign({ ...otherProps }).write();
  // }
}

function findUserRecord({ username }) {
  // @TODO
  // if (usersDb.find({ username }).value()) {
  //   return usersDb.find({ username });
  // }
  // if (usersDb.find({ email: username }).value()) {
  //   return usersDb.find({ email: username });
  // }
  // return null;
}

function checkUserAuthenticated({ username, password }) {
  // @TODO
  // return Boolean(usersDb.find({ username, password }).value());
}

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.post('/api/user/create', (req, res) => {
  res.send({ req: req.headers });
});

server.post('/api/user/login', (req, res) => {
  const { username, password } = req.body;
  const user = findUser({ username });
  if (!user || !checkUserAuthenticated({ username, password })) {
    const responseBody = createRejectResponse({
      message: 'Incorrect username or password.',
      code: 'NotAuthorizedException',
    });
    res.status(401).json(responseBody);
    return;
  }
  const responseBody = createLoginAcceptResponse({ username, password, groups: user.groups });
  res.status(200).json(responseBody);
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
