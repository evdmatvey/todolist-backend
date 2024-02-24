import { TagEntity } from '@/domains/entities/tag.entity';

export interface TagRepositoryPort {
  create(title: string): Promise<TagEntity>;
}
