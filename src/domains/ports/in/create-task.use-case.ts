import { TaskEntity } from '@/domains/entities/task.entity';
import { CreateTaskCommand } from './create-task.command';

export const CreateTaskUseCaseSymbol = Symbol('CreateTaskUseCaseSymbol');

export interface CreateTaskUseCase {
  createTask(command: CreateTaskCommand): Promise<TaskEntity>;
}
