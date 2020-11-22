const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

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
    auth: {
      AccessToken: IdToken,
      ExpiresIn: idExpiresIn,
      TokenType: 'Bearer',
      RefreshToken,
      IdToken,
    },
    groups
  };
}

function createRefreshAcceptResponse() {
  const IdToken = createIdToken({});
  return {
    auth: {
      AccessToken: IdToken,
      ExpiresIn: idExpiresIn,
      TokenType: 'Bearer',
      IdToken,
    }
  };
}

function createRejectResponse({ message, code }) {
  return {
    error: {
      message,
      code,
      time: (new Date).toISOString(),
      requestId: '84f7b5d2-7658-438e-8111-989743530620',
      statusCode: 400,
      retryable: false,
      retryDelay: 83.75597015222233
    }
  };
}

function verifyToken(token, key) {
  try {
    const decoded = jwt.verify(token, key, (err, decode) => decode !== undefined ? decode : err);
    return decoded && ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'].includes(decoded.name)
      ? false
      : true;
  } catch (err) {
    return false;
  }
}

function findUser({ username }) {
  const userRecord = findUserRecord({ username });
  return userRecord ? userRecord.value() : null;
}

function updateUser({ username, ...otherProps }) {
  const userRecord = findUserRecord({ username });
  if (userRecord) {
    userRecord.assign({ ...otherProps }).write();
  }
}

function findUserRecord({ username }) {
  if (usersDb.find({ username }).value()) {
    return usersDb.find({ username });
  }
  if (usersDb.find({ email: username }).value()) {
    return usersDb.find({ email: username });
  }
  return null;
}

function checkUserAuthenticated({ username, password }) {
  return Boolean(usersDb.find({ username, password }).value() || usersDb.find({ email: username, password }).value());
}

server.post('/api/login', (req, res) => {
  const { username, password, newPassword } = req.body;
  const user = findUser({ username });
  if (!user || !checkUserAuthenticated({ username, password })) {
    const responseBody = createRejectResponse({
      message: 'Incorrect username or password.',
      code: 'NotAuthorizedException',
    });
    res.status(401).json(responseBody);
    return;
  }
  if (checkUserAuthenticated({ username, password }) && user.temporary && newPassword) {
    updateUser({ username, password: newPassword, temporary: null });
    const responseBody = createLoginAcceptResponse({ username, password: newPassword, groups: user.groups });
    res.status(200).json(responseBody);
    return;
  }
  if (checkUserAuthenticated({ username, password }) && user.reset) {
    const responseBody = createRejectResponse({
      message: 'Password reset required for the user.',
      code: 'PasswordResetRequiredException',
    });
    res.status(401).json(responseBody);
    return;
  }
  if (checkUserAuthenticated({ username, password }) && user.temporary) {
    const responseBody = createRejectResponse({
      message: 'Invalid attributes given, new password should be given with key NEW_PASSWORD.',
      code: 'InvalidParameterException',
    });
    res.status(401).json(responseBody);
    return;
  }
  const responseBody = createLoginAcceptResponse({ username, password, groups: user.groups });
  res.status(200).json(responseBody);
});

server.post('/api/resetPassword', (req, res) => {
  const { username, code, newPassword } = req.body;
  const user = findUser({ username });
  if (user && user.reset && newPassword && code === '000000') {
    updateUser({ username, password: newPassword, reset: null });
    res.status(204).json({ message: 'Reset is done.' });
    return;
  }
  const responseBody = createRejectResponse({
    message: 'Password reset has been revoked.',
    code: 'NotResetException',
  });
  res.status(401).json(responseBody);
});

server.post('/api/refresh', (req, res) => {
  const { refreshToken } = req.body;
  if (verifyToken(refreshToken, REFRESH_KEY) === false) {
    const responseBody = createRejectResponse({
      message: 'Refresh Token has been revoked.',
      code: 'NotAuthorizedException',
    });
    res.status(401).json(responseBody);
    return;
  }
  const responseBody = createRefreshAcceptResponse();
  res.status(200).json(responseBody);
});

server.delete('/api/logout', (req, res) => {
  if (req.headers.authorization === undefined) {
    res.status(401).json({ message: 'Bad authorization header.' });
    return;
  }
  res.status(204).json(undefined);
});

// auth middleware:
server.use((req, res, next) => {
  if (req.headers.authorization === undefined) {
    res.status(401).json({ message: 'Bad authorization header.' });
    return;
  }
  if (verifyToken(req.headers.authorization, ID_KEY)) {
    next();
  } else {
    res.status(401).json({ message: 'Error: access_token is not valid.' });
  }
});

server.get('/api/rules', (req, res) => {
  const responseData = {
    result: {
      Items: rulesDb.value()
    }
  };

  res.status(200).json(responseData);
});

server.post('/api/rules', (req, res) => {
  const updates = req.body && req.body.rules;
  const timestamp = Date.now();
  const responseData = {
    result: {
      error: false,
      items: []
    }
  };

  if (!updates) {
    res.status(400).json({ error: 'Updates can not be null.' });
    return;
  }

  updates.forEach((update) => {
    if (update.op === 'create') {
      const createdRule = {
        ...update.rule,
        createTime: timestamp,
        updateTime: timestamp,
      };
      const responseItem = {
        id: update.id,
        createTime: createdRule.createTime,
      };

      rulesDb.push(createdRule).write();
      responseData.result.items.push(responseItem);
      return;
    }

    if (update.op === 'update') {
      const updatedRule = {
        ...update.rule,
        updateTime: timestamp,
      };
      const responseItem = {
        id: update.id,
        updateTime: updatedRule.updateTime,
      };

      rulesDb.find({ ruleType: update.rule.ruleType, ruleName: update.rule.ruleName }).assign(updatedRule).write(); // eslint-disable-line max-len
      responseData.result.items.push(responseItem);
      return;
    }

    if (update.op === 'delete') {
      rulesDb.remove({ ruleType: update.rule.ruleType, ruleName: update.rule.ruleName }).write();
      return;
    }
  });

  res.status(200).json(responseData);
});

server.get('/api/categories', (req, res) => {
  const responseData = {
    result: {
      Items: categoriesDb.value()
    }
  };

  res.status(200).json(responseData);
});

server.post('/api/categories', (req, res) => {
  const updates = req.body && req.body.categories;

  if (!updates) {
    res.status(400).json({ error: 'Updates can not be null.' });
    return;
  }

  updates.forEach((update) => {
    if (update.op === 'create') {
      categoriesDb.push(update.category).write();
      return;
    }

    if (update.op === 'update') {
      categoriesDb.find({ catName: update.category.catName }).assign(update.category).write();
      return;
    }

    if (update.op === 'delete') {
      categoriesDb.remove({ catName: update.category.catName }).write();
      return;
    }
  });

  res.sendStatus(200);
});

server.get('/api/fields', (req, res) => {
  const responseData = {
    result: {
      Items: fieldsDb.value()
    }
  };

  res.status(200).json(responseData);
});

server.post('/api/fields', (req, res) => {
  const updates = req.body && req.body.fields;

  if (!updates) {
    res.status(400).json({ error: 'Updates can not be null.' });
    return;
  }

  updates.forEach((update) => {
    if (update.op === 'create') {
      fieldsDb.push(update.field).write();
      return;
    }

    if (update.op === 'update') {
      fieldsDb.find({ docType: update.field.docType, alias: update.field.alias }).assign(update.field).write(); // eslint-disable-line max-len
      return;
    }

    if (update.op === 'delete') {
      fieldsDb.remove({ docType: update.field.docType, alias: update.field.alias }).write();
      return;
    }
  });

  res.sendStatus(200);
});

server.get('/api/layouts', (req, res) => {
  const responseData = {
    result: {
      Items: layoutsDb.value()
    }
  };

  res.status(200).json(responseData);
});

server.post('/api/layouts', (req, res) => {
  const updates = req.body && req.body.layouts;

  if (!updates) {
    res.status(400).json({ error: 'Updates can not be null.' });
    return;
  }

  updates.forEach((update) => {
    if (update.op === 'create') {
      layoutsDb.push(update.layout).write();
      return;
    }

    if (update.op === 'update') {
      layoutsDb.find({ layName: update.layout.layName }).assign(update.layout).write();
      return;
    }

    if (update.op === 'delete') {
      layoutsDb.remove({ layName: update.layout.layName }).write();
      return;
    }
  });

  res.sendStatus(200);
});

server.get('/api/reftables', (req, res) => {
  const responseData = {
    result: {
      Items: tablesDb.value()
    }
  };

  res.status(200).json(responseData);
});

server.post('/api/reftables', (req, res) => {
  const updates = req.body && req.body.reftables;
  const updateTables = req.body && req.body.updateTables;

  if (!updates && !updateTables) {
    res.status(400).json({ error: 'Updates can not be null.' });
    return;
  }

  if (updateTables) {
    const responseData = {
      result: updateTables.map(({ refName }) => ({ refName, lastPopTime: new Date() }))
    };
    res.status(200).json(responseData);
    return;
  }

  updates.forEach((update) => {
    if (update.op === 'create') {
      tablesDb.push(update.reftable).write();
      return;
    }

    if (update.op === 'update') {
      tablesDb.find({ refName: update.reftable.refName }).assign(update.reftable).write();
      return;
    }

    if (update.op === 'delete') {
      tablesDb.remove({ refName: update.reftable.refName }).write();
      return;
    }
  });

  res.sendStatus(200);
});

server.get('/api/wp', (req, res) => {
  const responseData = {
    result: {
      Items: wpDb.get('wp').value()
    }
  };

  res.status(200).json(responseData);
});

server.get('/api/wp/:id', (req, res) => {
  const id = req.params.id;
  const wp = wpDb.get('wp-by-id').find({ id }).value();

  if (!wp) {
    res.status(400).json({ error: `Unknown work package id: ${id}` });
    return;
  }

  const responseData = JSON.parse(JSON.stringify(wp));
  const layName = responseData.result.layout.layName;
  const layoutData = layoutsDb.find({ layName }).value();

  if (!layoutData) {
    res.status(500).json({ error: `Can not find layout: ${layName}` });
  }

  responseData.result.layout = layoutData;

  const fieldsData = fieldsDb.value();
  responseData.result.fields = fieldsData;

  const rulesData = rulesDb.value();
  responseData.result.rules = rulesData;

  res.status(200).json(responseData);
});

server.post('/api/wp/:id', (req, res) => {
  const id = req.params.id;
  const action = req.body && req.body.action;

  if (action === 'Autosave') {
    const updates = req.body && req.body.data;

    if (!updates) {
      res.status(400).json({ error: 'Updates can not be null.' });
      return;
    }

    const reqSeq = updates.reqSeq;

    if (!reqSeq) {
      res.status(400).json({ error: 'ReqSeq can not be null.' });
      return;
    }

    const wp = wpDb.get('wp-by-id').find({ id });

    if (!wp.value()) {
      res.status(400).json({ error: `Unknown work package id: ${id}` });
      return;
    }

    const updateAll = (obj, baseKey) => {
      Object.keys(obj).forEach(key => {
        const fullKey = `${baseKey}.${key}`;
        if (key === 'reqSeq') {
          return;
        } else if (key === 'noteText') {
          const userId = jwt.decode(req.headers.authorization).username;
          const notes = wp.get('result.data.notes').value() || {};
          wp.set(
            `${baseKey}.notes`,
            {
              ...notes,
              [reqSeq]: {
                userId: notes[reqSeq] ? notes[reqSeq].userId : userId,
                editTime: Date.now(),
                noteText: obj[key],
              }
            }
          ).write();
        } else if (key === 'repGroups') {
          Object.keys(obj[key]).forEach(k => {
            wp.set(`${fullKey}.${k}`, obj[key][k]).write();
          });
        } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
          updateAll(obj[key], fullKey);
        } else if (Array.isArray(obj[key]) || ['number', 'string', 'boolean'].includes(typeof obj[key])) {
          wp.set(fullKey, obj[key]).write();
        }
      });
    };

    updateAll(updates, 'result.data');
  } else {
    wpDb.get('wp').remove({ reqId: id }).write();
    wpDb.get('wp-by-id').remove({ id }).write();
  }

  res.sendStatus(200);
});

server.get('/api/widgets/monitor', (req, res) => {
  const responseData = {
    result: widgetDb.get('monitor').value()
  };

  res.status(200).json(responseData);
});

server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/wp/:id': '/wp-by-id/:id'
}));

server.use(router);

server.listen(3000, () => {
  console.log('Run API Server'); // eslint-disable-line no-console
});