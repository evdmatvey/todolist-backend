import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, genSalt } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserOrmEntity } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private _repository: Repository<UserOrmEntity>,
  ) {}

  async findByEmail(email: string) {
    return this._repository.findOneBy({ email });
  }

  async findById(id: string) {
    return this._repository.findOneBy({ id });
  }

  async create(dto: CreateUserDto) {
    const salt = await genSalt(10);
    const passwordHash = await hash(dto.password, salt);

    return this._repository.save({
      ...dto,
      password: passwordHash,
    });
  }
}
