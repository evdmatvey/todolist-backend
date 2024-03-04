import { ApiProperty } from '@nestjs/swagger';

export class TagResponse {
  @ApiProperty({ example: '64bb496f5d0c6476d977bd93' })
  id: string;

  @ApiProperty({ example: '64bb496f5d0c6476d977bd93' })
  userId: string;

  @ApiProperty({ example: 'title' })
  title: string;

  @ApiProperty({ example: '#000000' })
  color: string;
}

export class ForbiddenError {
  @ApiProperty({ example: 403 })
  statusCode: 403;

  @ApiProperty({ example: 'Укажите название тега!' })
  message: string;

  @ApiProperty({ example: 'Forbidden' })
  error: 'Forbidden';
}

export class UnauthorizedError {
  @ApiProperty({ example: 401 })
  statusCode: 401;

  @ApiProperty({ example: 'Войдите или зарегистрируйтесь!' })
  message: string;

  @ApiProperty({ example: 'Unauthorized' })
  error: 'Unauthorized';
}
