import { TagEntity } from '@/domains/entities';

export interface TagRepositoryPort {
  create(title: string): Promise<TagEntity>;
  loadTagByTitle(title: string): Promise<TagEntity>;
}
