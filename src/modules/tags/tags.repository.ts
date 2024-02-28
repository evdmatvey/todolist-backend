import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagRepositoryPort } from '@/domains/ports/out';
import { TagEntity } from '@/domains/entities';
import { Colors } from '@/utils/colors';
import { TagOrmEntity } from './entities/tag.entity';
import { TagsMapper } from './tags.mapper';

@Injectable()
export class TagsRepository implements TagRepositoryPort {
  constructor(
    @InjectRepository(TagOrmEntity)
    private _repository: Repository<TagOrmEntity>,
  ) {}

  public async create(title: string): Promise<TagEntity> {
    const color = Colors.generateColor();
    const tag = await this._repository.save({ title, color });

    return TagsMapper.mapToDomain(tag);
  }

  public async loadTagByTitle(title: string): Promise<TagEntity> {
    const fundedTag = await this._repository.findOneBy({ title });

    return TagsMapper.mapToDomain(fundedTag);
  }
}
