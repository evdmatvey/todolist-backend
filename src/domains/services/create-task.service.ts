import { TaskEntity } from '../entities/task.entity';
import { CreateTaskCommand } from '../ports/in/create-task.command';
import { CreateTaskUseCase } from '../ports/in/create-task.use-case';
import { TaskRepositoryPort } from '../ports/out/task-repository.port';

export class CreateTaskService implements CreateTaskUseCase {
  constructor(private _taskRepositoryPort: TaskRepositoryPort) {}

  public async createTask(command: CreateTaskCommand): Promise<TaskEntity> {
    try {
      const exitingTask = await this._taskRepositoryPort.loadTaskByText(
        command.text,
      );
      if (typeof exitingTask !== 'undefined')
        throw new Error('У вас уже есть такая задача');
      const task = await this._taskRepositoryPort.createTask(command.text);
      return task;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
