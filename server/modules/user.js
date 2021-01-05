import db from './db.js';

const user = {
  create: async (userData) => {
    const result = await db.createUser(userData);
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
