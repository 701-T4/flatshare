import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
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
  @ApiCreatedResponse({
    description: 'note created successfully',
    type: NoteResponseDto,
  })
  async createNote(
    @Body() createNoteDto: CreateNoteDto,
    @User() user: DecodedIdToken,
  ): Promise<NoteResponseDto | null> {
    const userDoc = await this.userStoreService.findOneByFirebaseId(user.uid);
    if (userDoc.house != undefined) {
      const houseDoc = await this.houseStoreService.findOne(userDoc.house);
      createNoteDto.house = houseDoc._id;
      return this.noteStoreService.create(createNoteDto);
    } else {
      throw new HttpException('user is not in a house', HttpStatus.NO_CONTENT);
    }
  }

  // TODO
  @Get('/')
  @ApiOperation({ summary: 'get all notes assigned to the house' })
  @ApiOkResponse({
    description: 'notes retrieved successfully',
    type: [NoteResponseDto],
  })
  @ApiNoContentResponse({ description: 'no notes for house' })
  async get(@User() user: DecodedIdToken): Promise<NoteResponseDto[] | null> {
    return null;
  }
}
