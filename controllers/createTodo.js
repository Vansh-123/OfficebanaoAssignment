const { Pool } = require('pg');

const createTodo = (pool) => {
  return async (req, res) => {
      const { title, description, image_url } = req.body;
  const insertQuery = 'INSERT INTO todos (title, description, image_url) VALUES ($1, $2, $3)';
  pool.query(insertQuery, [title, description, image_url], (err) => {
    if (err) {
      console.error('Error creating to-do:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(201).json({ message: 'To-do created successfully' });
  });
    
  };
};

module.exports = createTodo;


