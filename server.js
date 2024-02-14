


const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());

const pool = require("./config/database")

pool.on('connect', () => {
  console.log('Connected to the database');
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    image_url VARCHAR(255)
  )
`;

pool.query(createTableQuery, (err) => {
  if (err) {
    console.error('Error creating table:', err);
  }
});

require("dotenv").config();

const todoRoutes=require("./routes/todos")
app.use("/",todoRoutes)

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});