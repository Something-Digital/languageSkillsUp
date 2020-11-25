import mysql from 'mysql2/promise';

const connectionOptions = {
  host: 'localhost',
  user: 'root',
  database: 'languageskillsup',
};

const db = {
  createUser: async (user) => {
    const connection = await mysql.createConnection(connectionOptions);
    const result = await connection.execute(`
      INSERT INTO users(username, password_hash)
      VALUES('${user.username}', 'pass');
    `);
    console.log(result);
  },
};

export default db;
