import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HouseStoreService } from '../../db/house/houseStore.service';
import { UserStoreService } from '../../db/user/userStore.service';
import { Auth } from '../../util/auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../../util/user.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';
import UserResponseDto from './dto/user-response.dto';

@ApiTags('users')
@Controller('/api/v1/user')
export class UsersController {
  constructor(
    private readonly userStoreService: UserStoreService,
    private readonly houseStoreService: HouseStoreService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user resource',
    description: 'User must be linked to a firebase ID',
  })
  @ApiConflictResponse({
    description: 'User already exists',
  })
  @ApiCreatedResponse({
    description: 'User successfully created',
    type: UserResponseDto,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUserDoc = await this.userStoreService.findOneByFirebaseId(
      createUserDto.firebaseId,
    );
    if (existingUserDoc) {
      throw new HttpException('user already exists', HttpStatus.CONFLICT);
    }
    const createdUserDoc = await this.userStoreService.create(createUserDto);
    const houseDoc = await this.houseStoreService.findOne(createdUserDoc.house);

    return {
      name: createdUserDoc.name,
      firebaseId: createdUserDoc.firebaseId,
      house: houseDoc?.code,
    };
  }

  @Get()
  @Auth()
  @ApiOperation({ summary: 'get the users information' })
  @ApiOkResponse({
    description: 'returns the user information',
    type: UserResponseDto,
  })
  async currentUser(@User() user: DecodedIdToken): Promise<UserResponseDto> {
    const userDoc = await this.userStoreService.findOneByFirebaseId(user.uid);
    const houseDoc = await this.houseStoreService.findOne(userDoc.house);
    return {
      name: userDoc.name,
      firebaseId: userDoc.firebaseId,
      house: houseDoc?.code,
    };
  }
}
