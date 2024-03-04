import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { MockType } from '@/utils/types';
import { TagOrmEntity } from '../entities/tag.entity';
import { TagsRepository } from '../tags.repository';

describe('TagsRepository', () => {
  let tagsRepository: TagsRepository;
  let repositoryMock: MockType<Repository<TagOrmEntity>>;
  const tag = {
    id: 'id',
    userId: 'user-id',
    title: 'title',
    color: '#color',
  };

  const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
      findOneBy: jest.fn((entity) => entity),
      loadTagByTitle: jest.fn((entity) => entity),
    }),
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsRepository,
        {
          provide: getRepositoryToken(TagOrmEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    tagsRepository = module.get<TagsRepository>(TagsRepository);
    repositoryMock = module.get(getRepositoryToken(TagOrmEntity));
  });

  it('should find a tag', async () => {
    repositoryMock.findOneBy.mockReturnValue(tag);

    const fundedTag = await tagsRepository.loadTagByTitle(tag.title);

    expect(fundedTag.getTagData()).toMatchObject(tag);
    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ title: tag.title });
  });

  it('should not find a tag', async () => {
    repositoryMock.findOneBy.mockReturnValue(null);

    const fundedTag = await tagsRepository.loadTagByTitle(tag.title);

    expect(fundedTag).toBeNull();
    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ title: tag.title });
  });
});
