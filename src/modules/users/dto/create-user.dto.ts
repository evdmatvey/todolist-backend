import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'test@test.test',
  })
  email: string;

  @ApiProperty({
    example: 'testpassword',
  })
  password: string;
}
