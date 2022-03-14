import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  HttpException,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserStoreService } from '../../db/user/userStore.service';
import { HouseStoreService } from '../../db/house/houseStore.service';
import { Auth } from '../../util/auth.decorator';
import { User } from '../../util/user.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';
import { NoteStoreService } from '../../db/note/noteStore.service';
import NoteResponseDto from './dto/note-response.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@ApiTags('notes')
@Controller('/api/v1/house/note')
@Auth()
export class NoteController {
  constructor(
    private readonly houseStoreService: HouseStoreService,
    private readonly userStoreService: UserStoreService,
    private readonly noteStoreService: NoteStoreService,
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'create a new note resource' })
  @ApiNoContentResponse({
    description: 'user does not belong to a house',
  })
  @ApiCreatedResponse({
    description: 'note created successfully',
    type: NoteResponseDto,
  })
  async create(
    @Body() createNoteDto: CreateNoteDto,
    @User() user: DecodedIdToken,
  ): Promise<NoteResponseDto | null> {
    const userDoc = await this.userStoreService.findOneByFirebaseId(user.uid);
    if (userDoc.house) {
      const houseDoc = await this.houseStoreService.findOne(userDoc.house);
      createNoteDto.house = houseDoc._id;
      return this.noteStoreService.create(createNoteDto);
    } else {
      throw new HttpException(
        'user does not belong to a house',
        HttpStatus.NO_CONTENT,
      );
    }
  }

  @Get('/')
  @ApiOperation({ summary: 'get all notes assigned to the house' })
  @ApiNoContentResponse({ description: 'user does not belong to a house' })
  @ApiOkResponse({
    description: 'notes retrieved successfully',
    type: [NoteResponseDto],
  })
  async get(@User() user: DecodedIdToken): Promise<NoteResponseDto[] | null> {
    const userDoc = await this.userStoreService.findOneByFirebaseId(user.uid);
    if (userDoc.house) {
      return this.noteStoreService.findAllByHouse(userDoc.house._id);
    } else {
      throw new HttpException(
        'user does not belong to a house',
        HttpStatus.NO_CONTENT,
      );
    }
  }

  @Put('/:id')
  @ApiOperation({ summary: 'update a note' })
  @ApiOkResponse({
    description: 'notes updated successfully',
    type: NoteResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<NoteResponseDto> {
    return this.noteStoreService.update(id, updateNoteDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'delete a note' })
  @ApiOkResponse({
    description: 'notes deleted successfully',
    type: NoteResponseDto,
  })
  async delete(@Param('id') id: string): Promise<NoteResponseDto> {
    return this.noteStoreService.delete(id);
  }
}
