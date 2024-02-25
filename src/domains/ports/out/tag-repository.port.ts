import { TagEntity } from '@/domains/entities/tag.entity';

export interface TagRepositoryPort {
  create(title: string): Promise<TagEntity>;
  loadTagByTitle(title: string): Promise<TagEntity>;
}
