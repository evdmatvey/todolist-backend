import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { CreateTagUseCase, CreateTagUseCaseSymbol } from '@/domains/ports/in';
import { TagRepositoryPort } from '@/domains/ports/out';
import { CreateTagService } from '@/domains/services';
import { TagEntity } from '@/domains/entities';
import { TagsController } from '../tags.controller';
import { TagsRepository } from '../tags.repository';
import { TagOrmEntity } from '../entities/tag.entity';

describe('TagsController', () => {
  let tagsController: TagsController;
  let createTagUseCase: CreateTagUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        TagsRepository,
        {
          provide: getRepositoryToken(TagOrmEntity),
          useFactory: () => ({
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          }),
        },
        {
          provide: CreateTagUseCaseSymbol,
          useClass: CreateTagService,
        },
        {
          provide: CreateTagUseCaseSymbol,
          useFactory: (_tagRepository: TagRepositoryPort) => {
            return new CreateTagService(_tagRepository);
          },
          inject: [TagsRepository],
        },
      ],
      imports: [TagOrmEntity],
    }).compile();

    createTagUseCase = moduleRef.get<CreateTagUseCase>(CreateTagUseCaseSymbol);
    tagsController = moduleRef.get<TagsController>(TagsController);
  });

  describe('create | should create tag', () => {
    it('should return an array of cats', async () => {
      const entity = new TagEntity('id', 'userId', 'title', '#000000');
      const result = entity.getTagData();
      jest
        .spyOn(createTagUseCase, 'createTag')
        .mockImplementation(async () => entity);

      expect(
        await tagsController.create('userId', { title: 'title' }),
      ).toMatchObject(result);
    });
  });

  describe('create | should throw required error', () => {
    it('should return an array of cats', async () => {
      const entity = new TagEntity('id', 'userId', 'title', '#000000');
      jest
        .spyOn(createTagUseCase, 'createTag')
        .mockImplementation(async () => entity);

      try {
        await tagsController.create('userId', { title: '' });
      } catch (error) {
        expect(error.message).toBe('Укажите название тега!');
      }
    });
  });

  describe('create | should throw length error', () => {
    it('should return an array of cats', async () => {
      const entity = new TagEntity('id', 'userId', 'title', '#000000');
      jest
        .spyOn(createTagUseCase, 'createTag')
        .mockImplementation(async () => entity);

      try {
        await tagsController.create('userId', { title: 'teg' });
      } catch (error) {
        expect(error.message).toBe(
          'Длина названия тега должна быть больше 4 символов!',
        );
      }
    });
  });
});
