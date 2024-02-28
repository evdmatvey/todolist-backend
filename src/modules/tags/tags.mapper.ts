import { TagEntity } from '@/domains/entities';
import { Color } from '@/domains/types';
import { TagOrmEntity } from './entities/tag.entity';

export class TagsMapper {
  public static mapToDomain(tag: TagOrmEntity): TagEntity {
    const { id, title, color } = tag;

    return new TagEntity(id, title, color as Color);
  }
}
