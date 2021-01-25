import mysql from 'mysql2/promise';

const connectionOptions = {
  host: 'localhost',
  user: 'root',
  database: 'languageskillsup',
};

const db = {
  writeNewUser: async ({ username, passwordHash }) => {
    try {
      if (!username || !passwordHash) return null;

      const connection = await mysql.createConnection(connectionOptions);
      const result = (await connection.execute(`
        INSERT INTO users(username, password_hash)
        VALUES('${username}', '${passwordHash}');
      `))[0];

      if (result.affectedRows === 1) {
        return result.insertId;
      }

      return null;
    } catch (err) {
      return null;
    }
  },

  ifUserExists: async ({ username }) => {
    try {
      if (!username) return null;

      const connection = await mysql.createConnection(connectionOptions);
      const result = Object.values((await connection.execute(`
        SELECT EXISTS(
          SELECT *
          FROM users
          WHERE username = '${username}'
        );
      `))[0][0])[0];

      return !!result;
    } catch (err) {
      return null;
    }
  },

  getUser: async ({ username }) => {
    try {
      if (!username) return null;

      const connection = await mysql.createConnection(connectionOptions);
      const result = (await connection.execute(`
        SELECT *
        FROM users
        WHERE username = '${username}';
      `))[0][0];

      return {
        id: result.id,
        username: result.username,
        passwordHash: result.password_hash,
      };
    } catch (err) {
      return null;
    }
  },
};

export default db;
