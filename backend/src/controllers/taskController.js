const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all tasks
const getTasks = async (req, res, next) => {
  try {
    const { status, priority, search } = req.query;
    
    const where = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// Get single task
const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Create task
const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, status } = req.body;
    const task = await prisma.task.create({
      data: { title, description, priority, status },
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Update task
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;
    
    const task = await prisma.task.update({
      where: { id },
      data: { title, description, priority, status },
    });
    res.json(task);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Task not found' });
    }
    next(error);
  }
};

// Delete task
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Task not found' });
    }
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
