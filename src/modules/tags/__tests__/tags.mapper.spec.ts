import { TagsMapper } from '../tags.mapper';
import { TagOrmEntity } from '../entities/tag.entity';

describe('TagsMapper', () => {
  const tagOrmEntity: TagOrmEntity = {
    id: 'id',
    title: 'title',
    userId: 'user-id',
    color: '#ffffff',
    createdAt: '',
  };

  it('should return TagEntity', () => {
    const tagEntity = TagsMapper.mapToDomain(tagOrmEntity);

    expect(tagEntity.getTagData()).toMatchObject({
      id: tagOrmEntity.id,
      userId: tagOrmEntity.userId,
      title: tagOrmEntity.title,
      color: tagOrmEntity.color,
    });
  });
});
