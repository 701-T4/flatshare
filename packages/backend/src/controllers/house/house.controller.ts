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
import { AnnouncementStoreService } from '../../db/announcement/announcementStore.service';
import { Auth } from '../../util/auth.decorator';
import { CreateHouseDto } from './dto/create-house.dto';
import HouseResponseDto from './dto/house-response.dto';
import { HouseUtil } from './house.util';
import { AnnouncementUtil } from '../announcements/announcements.util';
import { User } from '../../util/user.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';
import { JoinHouseDto } from './dto/join-house.dto';
import UpdateHouseDto from './dto/update-house.dto';

@ApiTags('houses')
@Controller('/api/v1/house')
@Auth()
export class HouseController {
  constructor(
    private readonly houseStoreService: HouseStoreService,
    private readonly userStoreService: UserStoreService,
    private readonly announcementStoreService: AnnouncementStoreService,
    private readonly announcementUtil: AnnouncementUtil,
    private readonly houseUtil: HouseUtil,
  ) {}

  @Post()
  @ApiOperation({ summary: 'create a new house resource' })
  @ApiCreatedResponse({
    description: 'house created successfully',
    type: HouseResponseDto,
  })
  async create(
    @Body() createHouseDto: CreateHouseDto,
    @User() user: DecodedIdToken,
  ): Promise<HouseResponseDto> {
    const owner = await this.userStoreService.findOneByFirebaseId(user.uid);
    const house = await this.houseStoreService.create({
      name: createHouseDto.name,
      email: createHouseDto.email,
      address: createHouseDto.address,
      code: this.houseUtil.generateString(8),
      rent: null,
      maxOccupants: null,
      owner: owner._id,
      users: [owner._id],
      latestAnnouncement: null,
    });
    await this.userStoreService.updateByFirebaseId(user.uid, {
      house: house._id,
    });
    return {
      name: house.name,
      address: house.address,
      email: house.email,
      rent: house.rent,
      maxOccupants: house.maxOccupants,
      code: house.code,
      owner: user.uid,
      users: [
        {
          name: owner.name,
          house: house.code,
          firebaseId: owner.firebaseId,
          rentPercentage: owner.rentPercentage,
          contact: owner.contact,
          dateJoined: owner.dateJoined,
          contractEndingDate: owner.contractEndingDate,
        },
      ],
      latestAnnouncement: null,
    };
  }

  @Get()
  @ApiOperation({ summary: 'get the currently assigned house' })
  @ApiOkResponse({
    description: 'house retrieved successfully',
    type: HouseResponseDto,
  })
  @ApiNoContentResponse({ description: 'user is not in a house' })
  async get(@User() user: DecodedIdToken): Promise<HouseResponseDto | null> {
    const userDoc = await this.userStoreService.findOneByFirebaseId(user.uid);
    if (userDoc?.house != undefined) {
      const house = await this.houseStoreService.findOne(userDoc.house);
      const owner = await this.userStoreService.findOne(house.owner);
      const userList = await this.houseStoreService.getUserDto(house.id);

      let latestAnnouncementDto = null;
      if (house.latestAnnouncement != null) {
        const announcementDoc = await this.announcementStoreService.findOne(
          house.latestAnnouncement,
        );
        latestAnnouncementDto =
          await this.announcementUtil.convertAnnouncementDocumentToResponseDTO(
            announcementDoc,
            this.userStoreService,
          );
      }

      if (house != undefined) {
        return {
          name: house.name,
          address: house.address,
          email: house.email,
          rent: house.rent,
          maxOccupants: house.maxOccupants,
          code: house.code,
          owner: owner.firebaseId,
          users: userList,
          latestAnnouncement: latestAnnouncementDto,
        };
      }
    }

    throw new HttpException('user is not in a house', HttpStatus.NO_CONTENT);
  }

  @Put()
  @ApiOperation({ summary: 'join a new house' })
  @ApiOkResponse({
    description: 'house joined successfully',
    type: HouseResponseDto,
  })
  @ApiBadRequestResponse({ description: 'code is invalid' })
  async joinHouse(
    @Body() joinHouseDto: JoinHouseDto,
    @User() user: DecodedIdToken,
  ): Promise<HouseResponseDto> {
    const addedUser = await this.userStoreService.findOneByFirebaseId(user.uid);
    const house = await this.houseStoreService.findOneByCode(
      joinHouseDto.houseCode,
    );
    if (house != null) {
      house.users.push(addedUser._id);
      await this.userStoreService.updateByFirebaseId(user.uid, {
        house: house._id,
      });
      await this.houseStoreService.update(house.id, {
        users: house.users,
      });
      const owner = await this.userStoreService.findOne(house.owner);
      const userList = await this.houseStoreService.getUserDto(house.id);
      return {
        name: house.name,
        address: house.address,
        email: house.email,
        rent: house.rent,
        maxOccupants: house.maxOccupants,
        code: house.code,
        owner: owner.firebaseId,
        users: userList,
      };
    } else throw new HttpException('code is invalid', HttpStatus.BAD_REQUEST);
  }

  @Put('update')
  @ApiOperation({ summary: 'update the current house details' })
  @ApiOkResponse({
    description: 'house details updated successfully',
    type: HouseResponseDto,
  })
  @ApiBadRequestResponse({ description: 'failed to update house details' })
  async updateHouse(
    @Body() updateHouseDto: UpdateHouseDto,
    @User() user: DecodedIdToken,
  ): Promise<HouseResponseDto> {
    const retrievedUser = await this.userStoreService.findOneByFirebaseId(
      user.uid,
    );
    let house = await this.houseStoreService.findOneByCode(updateHouseDto.code);
    if (house != null) {
      if (retrievedUser._id.equals(house.owner)) {
        await this.houseStoreService.update(house.id, {
          name: updateHouseDto.name,
          email: updateHouseDto.email,
          address: updateHouseDto.address,
          rent: updateHouseDto.rent,
          maxOccupants: updateHouseDto.maxOccupants,
        });
        if (updateHouseDto.owner) {
          const newOwner = await this.userStoreService.findOneByFirebaseId(
            updateHouseDto.owner,
          );
          await this.houseStoreService.update(house.id, {
            owner: newOwner._id,
          });
        }
        if (updateHouseDto.users) {
          const userIds = [];
          await Promise.all(
            updateHouseDto.users.map(async (user) => {
              userIds.push(
                await this.userStoreService.getUserIdFromFirebaseId(user),
              );
            }),
          );

          await Promise.all(
            house.users.map(async (userId) => {
              if (
                !userIds.some(function (newUser) {
                  return newUser.equals(userId);
                })
              ) {
                await this.userStoreService.update(userId.toString(), {
                  house: null,
                });
              }
            }),
          );

          await this.houseStoreService.update(house.id, {
            users: userIds,
          });
        }
        house = await this.houseStoreService.findOneByCode(updateHouseDto.code);
        const owner = await this.userStoreService.findOne(house.owner);
        const userList = await this.houseStoreService.getUserDto(house.id);
        return {
          name: house.name,
          address: house.address,
          email: house.email,
          rent: house.rent,
          maxOccupants: house.maxOccupants,
          code: house.code,
          owner: owner.firebaseId,
          users: userList,
        };
      } else {
        throw new HttpException(
          'user is not house owner',
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      throw new HttpException(
        'failed to update house details',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
