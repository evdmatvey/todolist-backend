import { TaskEntity } from '../task.entity';

describe('Task Entity', () => {
  it('getTaskData | should return correct object of task data', () => {
    const taskEntity = new TaskEntity('id', '123', false);
    const expectedResult = { id: 'id', text: '123', status: false };
    const taskData = taskEntity.getTaskData();

    expect(taskData).toMatchObject(expectedResult);
  });

  it('isSought | should return true', () => {
    const taskEntity = new TaskEntity('id', '123', false);
    const result = taskEntity.isSought('12');

    expect(result).toBe(true);
  });

  it('isSought | should return false', () => {
    const taskEntity = new TaskEntity('id', '123', false);
    const result = taskEntity.isSought('5');

    expect(result).toBe(false);
  });
});
