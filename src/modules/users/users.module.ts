import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserOrmEntity } from './entities/user.entity';

@Module({
  controllers: [],
  providers: [UsersRepository],
  exports: [UsersRepository, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
})
export class UsersModule {}
