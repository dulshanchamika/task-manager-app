const request = require('supertest');
const app = require('../index');

// Mock Prisma
jest.mock('@prisma/client', () => {
  const mPrisma = {
    task: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('Task API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/tasks', () => {
    it('should return all tasks', async () => {
      const mockTasks = [{ id: '1', title: 'Task 1' }];
      prisma.task.findMany.mockResolvedValue(mockTasks);

      const res = await request(app).get('/api/tasks');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockTasks);
      expect(prisma.task.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const newTask = { title: 'New Task', priority: 'HIGH' };
      prisma.task.create.mockResolvedValue({ id: '2', ...newTask });

      const res = await request(app)
        .post('/api/tasks')
        .send(newTask);

      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toEqual('New Task');
      expect(prisma.task.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ title: 'New Task' })
      });
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return 404 if task not found', async () => {
      prisma.task.findUnique.mockResolvedValue(null);

      const res = await request(app).get('/api/tasks/999');

      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toEqual('Task not found');
    });
  });
});
