import bcrypt from 'bcrypt';

import db from './db.js';

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

    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

    const userId = await db.createUser({ username, passwordHash });

    if (userId) {
      result.ok = true;
      result.message = `User ${username} created!`;
      result.data = { userId, username };
    }
    return result;
  },
};

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

export default user;
