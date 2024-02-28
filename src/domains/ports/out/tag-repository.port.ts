import { TagEntity } from '@/domains/entities';

export interface TagRepositoryPort {
  create(title: string, userId: string): Promise<TagEntity>;
  loadTagByTitle(title: string): Promise<TagEntity>;
}
