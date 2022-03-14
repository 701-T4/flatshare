import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
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
  @ApiBadRequestResponse({
    description: 'User successfully created',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({ description: 'no user name provided' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const userDoc = await this.userStoreService.create(createUserDto);
    const houseDoc = await this.houseStoreService.findOne(userDoc.house);
    const userName = userDoc?.name && createUserDto.name;
    if (!userName) {
      throw new HttpException('no user name provided', HttpStatus.BAD_REQUEST);
    }
    return {
      name: userName,
      firebaseId: userDoc.firebaseId,
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
