const { Pool } = require('pg');

const updateTodo = (pool) => {
  return async (req, res) => {
        const { title, description, image_url } = req.body;
        const todoId = req.params.todo_id;
        const updateQuery = 'UPDATE todos SET title=$1, description=$2, image_url=$3 WHERE id=$4';
        pool.query(updateQuery, [title, description, image_url, todoId], (err, results) => {
            if (err || results.rowCount === 0) {
            console.error('Error updating to-do:', err);
            res.status(404).json({ error: 'item not found' });
            return;
            }
            res.status(200).json({ message: 'item updated successfully' });
        });
  };
};

module.exports = updateTodo;



