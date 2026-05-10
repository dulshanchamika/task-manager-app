const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { validateTask } = require('../middleware/validator');

router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', validateTask, taskController.createTask);
router.put('/:id', validateTask, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
