import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CreateTagService } from '@/domains/services';
import { CreateTagUseCaseSymbol } from '@/domains/ports/in';
import { TagRepositoryPort } from '@/domains/ports/out';
import { TagOrmEntity } from './entities/tag.entity';
import { TagsController } from './tags.controller';
import { TagsRepository } from './tags.repository';

@Module({
  controllers: [TagsController],
  providers: [
    TagsRepository,
    {
      provide: CreateTagUseCaseSymbol,
      useClass: CreateTagService,
    },
    {
      provide: CreateTagUseCaseSymbol,
      useFactory: (_tagRepository: TagRepositoryPort) => {
        return new CreateTagService(_tagRepository);
      },
      inject: [TagsRepository],
    },
  ],
  imports: [TypeOrmModule.forFeature([TagOrmEntity])],
})
export class TagsModule {}
