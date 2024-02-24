import { CreateTagCommand, TagRepositoryPort } from '@/domains/ports';
import { CreateTagService } from '../create-tag.service';

describe('UpdateTagService', () => {
  let tagRepositoryPort: TagRepositoryPort;
  let createTagService: CreateTagService;
  let tagTitle: string;

  beforeEach(() => {
    tagRepositoryPort = {
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
});
