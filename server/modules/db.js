import mysql from 'mysql2/promise';

const connectionOptions = {
  host: 'localhost',
  user: 'root',
  database: 'languageskillsup',
};

const db = {
  createUser: async ({ username, passwordHash }) => {
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
};

export default db;
