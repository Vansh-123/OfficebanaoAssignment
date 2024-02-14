const { Pool } = require('pg');

const deleteTodo = (pool) => {
  return async (req, res) => {
       const todoId = req.params.todo_id;
  const deleteQuery = 'DELETE FROM todos WHERE id=$1';
  pool.query(deleteQuery, [todoId], (err, results) => {
    if (err || results.rowCount === 0) {
      console.error('Error deleting to-do:', err);
      res.status(404).json({ error: 'To-do not found' });
      return;
    }
    res.status(200).json({ message: 'To-do deleted successfully' });
  });
  };
};

module.exports = deleteTodo;



