import { CreateTagCommand } from '@/domains/ports/in';
import { TagRepositoryPort } from '@/domains/ports/out';
import { TagEntity } from '@/domains/entities';
import { CreateTagService } from '../create-tag.service';

describe('UpdateTagService', () => {
  let tagRepositoryPort: TagRepositoryPort;
  let createTagService: CreateTagService;
  let tagTitle: string;
  let userId: string;
  const tag: TagEntity = new TagEntity(
    'mock-id',
    'user-id',
    'mock-title',
    '#000000',
  );

  beforeEach(() => {
    tagRepositoryPort = {
      loadTagByTitle: jest.fn(),
      create: jest.fn(),
    };
    createTagService = new CreateTagService(tagRepositoryPort);
  });

  afterEach(() => {
    tagTitle = null;
    createTagService = null;
  });

  it('should create tag', async () => {
    tagTitle = 'title';
    userId = 'userId';

    const command: CreateTagCommand = new CreateTagCommand(tagTitle, userId);
    await createTagService.createTag(command);

    expect(tagRepositoryPort.create).toHaveBeenCalledWith(tagTitle, userId);
  });

  it('should throw require title error', async () => {
    tagTitle = ' ';
    userId = 'user-id';

    try {
      const command: CreateTagCommand = new CreateTagCommand(tagTitle, userId);
      await createTagService.createTag(command);
    } catch (error) {
      expect(error.message).toBe('Укажите название тега!');
    }
  });

  it('should throw title length error', async () => {
    tagTitle = 'tag';
    userId = 'user-id';

    try {
      const command: CreateTagCommand = new CreateTagCommand(tagTitle, userId);
      await createTagService.createTag(command);
    } catch (error) {
      expect(error.message).toBe(
        'Длина названия тега должна быть больше 4 символов!',
      );
    }
  });

  it('should throw error', async () => {
    tagTitle = 'mock-title';
    userId = 'user-id';

    try {
      (tagRepositoryPort.loadTagByTitle as jest.Mock).mockResolvedValue(tag);
      const command: CreateTagCommand = new CreateTagCommand(tagTitle, userId);
      await createTagService.createTag(command);
    } catch (error) {
      expect(error.message).toBe('У вас уже есть тег с таким названием!');
    }
  });
});
