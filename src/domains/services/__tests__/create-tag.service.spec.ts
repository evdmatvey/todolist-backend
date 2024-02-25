import { CreateTagCommand, TagRepositoryPort } from '@/domains/ports';
import { CreateTagService } from '../create-tag.service';
import { TagEntity } from '@/domains/entities/tag.entity';
import { Colors } from '@/domains/types';

describe('UpdateTagService', () => {
  let tagRepositoryPort: TagRepositoryPort;
  let createTagService: CreateTagService;
  let tagTitle: string;
  const tag: TagEntity = new TagEntity('mock-id', 'mock-title', Colors.white);

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

    const command: CreateTagCommand = new CreateTagCommand(tagTitle);
    await createTagService.createTag(command);

    expect(tagRepositoryPort.create).toHaveBeenCalledWith(tagTitle);
  });

  it('should throw require title error', async () => {
    tagTitle = ' ';

    try {
      const command: CreateTagCommand = new CreateTagCommand(tagTitle);
      await createTagService.createTag(command);
    } catch (error) {
      expect(error.message).toBe('Укажите название тега!');
    }
  });

  it('should throw title length error', async () => {
    tagTitle = 'tag';

    try {
      const command: CreateTagCommand = new CreateTagCommand(tagTitle);
      await createTagService.createTag(command);
    } catch (error) {
      expect(error.message).toBe(
        'Длина названия тега должна быть больше 4 символов!',
      );
    }
  });

  it('should throw error', async () => {
    tagTitle = 'mock-title';

    try {
      (tagRepositoryPort.loadTagByTitle as jest.Mock).mockResolvedValue(tag);
      const command: CreateTagCommand = new CreateTagCommand(tagTitle);
      await createTagService.createTag(command);
    } catch (error) {
      expect(error.message).toBe('У вас уже есть тег с таким названием!');
    }
  });
});