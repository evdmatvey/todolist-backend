import { TagEntity } from '../entities/tag.entity';
import {
  CreateTagCommand,
  CreateTagUseCase,
  TagRepositoryPort,
} from '../ports/';

export class CreateTagService implements CreateTagUseCase {
  constructor(private readonly _tagRepositoryPort: TagRepositoryPort) {}

  public async createTag(command: CreateTagCommand): Promise<TagEntity> {
    try {
      const existingTag = await this._tagRepositoryPort.loadTagByTitle(
        command.title,
      );

      if (typeof existingTag !== 'undefined')
        throw new Error('У вас уже есть тег с таким названием!');

      const tag = await this._tagRepositoryPort.create(command.title);

      return tag;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
