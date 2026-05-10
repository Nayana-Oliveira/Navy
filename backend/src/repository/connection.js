import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT
});

console.log('Conexão com o banco de dados estabelecida com sucesso!');

export default connection;