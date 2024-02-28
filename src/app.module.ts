import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity, UsersModule } from '@/modules/users';
import { AuthModule } from '@/modules/auth';
import { TagOrmEntity } from './modules/tags/entities/tag.entity';
import { TagsModule } from './modules/tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserOrmEntity, TagOrmEntity],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    TagsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
