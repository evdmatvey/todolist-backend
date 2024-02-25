import { TaskEntity } from '@/domains/entities/task.entity';

export interface TaskRepositoryPort {
  createTask(text: string): Promise<TaskEntity>;
  loadTaskByText(text: string): Promise<TaskEntity>;
}
