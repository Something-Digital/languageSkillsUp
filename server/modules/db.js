import mysql from 'mysql2/promise';

const connectionOptions = {
  host: 'localhost',
  user: 'root',
  database: 'languageskillsup',
};

const db = {
  createUser: async (user) => {
    try {
      const connection = await mysql.createConnection(connectionOptions);
      const result = await connection.execute(`
      INSERT INTO users(username, password_hash)
      VALUES('${user.username}', '${user.password}');
    `);
      if (result.affectedRows === 1) {
        return {
          success: true,
          data: {
            user: {
              id: result.insertId,
              ...user,
            },
          },
        };
      }
      return {
        success: false,
        reason: 'Couldn`t create a user',
      };
    } catch (err) {
      return {
        success: false,
        reason: 'DB error: Something went wrong',
      };
    }
  },
};

export default db;
