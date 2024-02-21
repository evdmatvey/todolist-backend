import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { UserOrmEntity } from '@/modules/users/entities/user.entity';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({ type: CreateUserDto })
  async login(@Request() req) {
    return this._authService.login(req.user as UserOrmEntity);
  }

  @Post('/signup')
  register(@Body() dto: CreateUserDto) {
    return this._authService.signup(dto);
  }
}
