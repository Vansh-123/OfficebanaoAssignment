const express  = require("express");
const router = express.Router();
const { Pool } = require('pg');
const pool=require("../config/database")
const createTodoController = require('../controllers/createTodo');
const deleteTodoController = require('../controllers/deleteTodo');
const updateTodoController = require('../controllers/updateTodo');
const createTodoBatchesController = require('../controllers/createTodoBatches');
const getTodosByPageController = require('../controllers/getTodo');

router.post('/todos', createTodoController(pool));
router.put('/todos/:todo_id', updateTodoController(pool));
router.delete('/todos/:todo_id', deleteTodoController(pool));
// app.get('/todos',getTodoBatchesController(pool));
router.post('/todos/batch', (req, res) => {
    createTodoBatchesController(pool)(req, res);
  });
router.get('/todos/', getTodosByPageController(pool));


module.exports=router;