const { Pool } = require('pg');

const getTodo = (pool) => {
  return async (req, res) => {
    const page = req.query.page || 1;
    const perPage = req.query.per_page || 10;
    const selectQuery = 'SELECT * FROM todos LIMIT $1 OFFSET $2';
    pool.query(selectQuery, [perPage, (page - 1) * perPage], (err, results) => {
      if (err) {
        console.error('Error fetching to-dos:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const totalRows = results.rowCount;
      res.status(200).json({
        todos: results.rows,
        total_pages: Math.ceil(totalRows / perPage),
        current_page: page
      });
    });
  };
};

module.exports = getTodo;

