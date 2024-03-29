const { Pool } = require('pg');


require("dotenv").config();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todoapp1',
  password: process.env.password,
  port: 5432,
});

module.exports = pool;
