const { Pool } = require('pg');

const createTodoBatches = (pool) => {
  return async (req, res) => {
           const todosData = req.body.todos;
  
    // Validate input data (optional, but recommended)
    if (!Array.isArray(todosData) || !todosData.length) {
      return res.status(400).json({ error: 'Invalid request: Missing or empty "todos" array' });
    }
  
    // Use prepared statements for security and efficiency
    const insertQuery = `
      INSERT INTO todos (title, description, image_url) VALUES ($1, $2, $3)
    `;
  
    try {
      // Start a transaction for data consistency (optional)
      await pool.query('BEGIN');
  
      // Insert each todo asynchronously to improve performance
      await Promise.all(todosData.map(async (todo) => {
        await pool.query(insertQuery, [todo.title, todo.description, todo.image_url]);
      }));
  
      // Commit the transaction (optional)
      await pool.query('COMMIT');
  
      res.status(201).json({ message: 'Batch of todos created successfully' });
    } catch (err) {
      // Handle errors gracefully, log them, and provide user-friendly messages
      console.error('Error creating batch of todos:', err);
      await pool.query('ROLLBACK'); // Rollback transaction if necessary
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
};

module.exports = createTodoBatches;


