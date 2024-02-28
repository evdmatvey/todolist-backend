import {
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tags')
@Unique(['title'])
export class TagOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  title: string;

  @Column()
  color: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt?: string;
}
