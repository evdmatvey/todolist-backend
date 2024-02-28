import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  ForbiddenException,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreateTagCommand,
  CreateTagUseCase,
  CreateTagUseCaseSymbol,
} from '@/domains/ports/in';
import { UserId } from '@/decorators';
import { JwtAuthGuard } from '@/modules/auth';
import { CreateTagDto } from './dto/create-tag.dto';
import { ForbiddenError, TagResponse, UnauthorizedError } from './types';

@UseGuards(JwtAuthGuard)
@Controller('tags')
@ApiTags('Tags')
@ApiBearerAuth()
export class TagsController {
  constructor(
    @Inject(CreateTagUseCaseSymbol)
    private readonly _createTagUseCase: CreateTagUseCase,
  ) {}

  @Post()
  @ApiOkResponse({ type: TagResponse })
  @ApiForbiddenResponse({ type: ForbiddenError })
  @ApiUnauthorizedResponse({ type: UnauthorizedError })
  public async create(@UserId() userId: string, @Body() dto: CreateTagDto) {
    try {
      const command = new CreateTagCommand(dto.title, userId);
      const tag = await this._createTagUseCase.createTag(command);

      return tag.getTagData();
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
