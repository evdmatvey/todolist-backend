import { CreateTagCommand, CreateTagUseCase } from '@/domains/ports/in';
import { TagRepositoryPort } from '@/domains/ports/out';
import { TagEntity } from '@/domains/entities';

export class CreateTagService implements CreateTagUseCase {
  constructor(private readonly _tagRepositoryPort: TagRepositoryPort) {}

  public async createTag(command: CreateTagCommand): Promise<TagEntity> {
    try {
      const existingTag = await this._tagRepositoryPort.loadTagByTitle(
        command.title,
      );

      if (typeof existingTag !== 'undefined')
        throw new Error('У вас уже есть тег с таким названием!');

      const tag = await this._tagRepositoryPort.create(
        command.title,
        command.userId,
      );

      return tag;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
