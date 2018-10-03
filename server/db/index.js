const { Pool } = require('pg');

const {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT
} = process.env;

if (
  !DB_USER ||
  !DB_HOST ||
  !DB_DATABASE ||
  !DB_PASSWORD ||
  !DB_PORT
) {
  throw new Error('Missing required DB env vars');
}

const database = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT
});

module.exports = database;




