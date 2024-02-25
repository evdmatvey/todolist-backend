import { TaskEntity } from '../../entities/task.entity';
import { TaskRepositoryPort } from '../../ports/out/task-repository.port';
import { CreateTaskService } from '../create-task.service';
import { CreateTaskCommand } from '../../ports/in/create-task.command';

describe('CreateTaskService', () => {
  let taskRepositoryPort: TaskRepositoryPort;
  let createTaskService: CreateTaskService;
  let taskText: string;
  const task: TaskEntity = new TaskEntity('mock-id', 'mock-text', false);

  beforeEach(() => {
    taskRepositoryPort = {
      createTask: jest.fn(),
      loadTaskByText: jest.fn(),
    };

    createTaskService = new CreateTaskService(taskRepositoryPort);
  });

  afterEach(() => {
    taskRepositoryPort = null;
    createTaskService = null;
  });

  it('should create task', async () => {
    taskText = '12356';
    const command = new CreateTaskCommand(taskText);
    await createTaskService.createTask(command);

    expect(taskRepositoryPort.createTask).toBeCalledWith(taskText);
  });

  it('should take error message', async () => {
    taskText = '123';
    try {
      const command = new CreateTaskCommand(taskText);
      await createTaskService.createTask(command);
    } catch (error) {
      expect(error.message).toBe('Длина задачи не менее 4 символов!');
    }
  });

  it('should throw error', async () => {
    taskText = 'mock-text';
    try {
      (taskRepositoryPort.loadTaskByText as jest.Mock).mockResolvedValue(task);
      const command = new CreateTaskCommand(taskText);
      await createTaskService.createTask(command);
    } catch (error) {
      expect(error.message).toBe('У вас уже есть такая задача');
    }
  });
});
