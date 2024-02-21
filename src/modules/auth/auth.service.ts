import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersRepository } from '@/modules/users/users.repository';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { UserOrmEntity } from '@/modules/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private _usersRepository: UsersRepository,
    private _jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this._usersRepository.findByEmail(email);
    const isValidPassword = await compare(password, user.password);

    if (user && isValidPassword) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async signup(dto: CreateUserDto) {
    try {
      const userData = await this._usersRepository.create(dto);

      return {
        token: this._jwtService.sign({ id: userData.id }),
      };
    } catch (err) {
      throw new ForbiddenException('Ошибка при регистрации');
    }
  }

  async login(user: UserOrmEntity) {
    return {
      token: this._jwtService.sign({ id: user.id }),
    };
  }
}
