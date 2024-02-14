const { Pool } = require('pg');

const createTodoBatches = (pool) => {
  return async (req, res) => {
           const todosData = req.body.todos;
  

    if (!Array.isArray(todosData) || !todosData.length) {
      return res.status(400).json({ error: 'Invalid request: Missing or empty "todos" array' });
    }
  
  
    const insertQuery = `
      INSERT INTO todos (title, description, image_url) VALUES ($1, $2, $3)
    `;
  
    try {

      await pool.query('BEGIN');
  
      await Promise.all(todosData.map(async (todo) => {
        await pool.query(insertQuery, [todo.title, todo.description, todo.image_url]);
      }));
  
 
      await pool.query('COMMIT');
  
      res.status(201).json({ message: 'Batch of todos created successfully' });
    } catch (err) {

      console.error('Error creating batch of todos:', err);
      await pool.query('ROLLBACK'); 
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
};

module.exports = createTodoBatches;


