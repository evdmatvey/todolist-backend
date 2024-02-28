import { TagEntity } from '../tag.entity';

describe('Tag Entity', () => {
  it('getTagData | should return correct object of tag data', () => {
    const tagEntity = new TagEntity('id', 'title', '#000000');
    const expectedResult = { id: 'id', title: 'title', color: '#000000' };
    const tagData = tagEntity.getTagData();

    expect(tagData).toMatchObject(expectedResult);
  });

  it('isSought | should return true', () => {
    const tagEntity = new TagEntity('id', 'title', '#000000');
    const result = tagEntity.isSought('ti');

    expect(result).toBe(true);
  });

  it('isSought | should return false', () => {
    const tagEntity = new TagEntity('id', 'title', '#000000');
    const result = tagEntity.isSought('ii');

    expect(result).toBe(false);
  });
});
