import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DecodedIdToken } from 'firebase-admin/auth';
import { AnnouncementModel } from '../../db/announcement/announcement.schema';
import { UserStoreService } from '../../db/user/userStore.service';
import { HouseStoreService } from '../../db/house/houseStore.service';
import { AnnouncementStoreService } from '../../db/announcement/announcementStore.service';
import { User } from '../../util/user.decorator';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import {
  AnnouncementResponseDto,
  AnnouncementsResponseDto,
} from './dto/announcement-response.dto';
import { AnnouncementUtil } from './announcements.util';
import { Auth } from '../../util/auth.decorator';

@ApiTags('announcements')
@Controller('/api/v1/house/announcements')
@Auth()
export class AnnouncementController {
  constructor(
    private readonly announcementStoreService: AnnouncementStoreService,
    private readonly announcementUtil: AnnouncementUtil,
    private readonly userStoreService: UserStoreService,
    private readonly houseStoreService: HouseStoreService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new announcement' })
  @ApiCreatedResponse({
    description: 'announcement created successfully',
    type: AnnouncementResponseDto,
  })
  async createAnnouncement(
    @Body() createAnnouncementDto: CreateAnnouncementDto,
    @User() user: DecodedIdToken,
  ): Promise<AnnouncementResponseDto> {
    const author = await this.userStoreService.findOneByFirebaseId(user.uid);
    if (!author.house) {
      throw new HttpException('user is not in a house', HttpStatus.NOT_FOUND);
    }

    const house = await this.houseStoreService.findOne(author.house);
    const announcementModel: AnnouncementModel = {
      title: createAnnouncementDto.title,
      description: createAnnouncementDto.description,
      author: author._id,
      houseCode: house.code,
    };

    const announcement = await this.announcementStoreService.create(
      announcementModel,
    );
    if (!announcement) {
      throw new HttpException(
        'announcement could not be created',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await this.houseStoreService.update(house._id, {
        latestAnnouncement: announcement._id,
      });
    }

    return this.announcementUtil.convertAnnouncementDocumentToResponseDTO(
      announcement,
      this.userStoreService,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all announcements in users house' })
  @ApiOkResponse({
    description: 'announcements fetched successfully',
    type: AnnouncementsResponseDto,
  })
  async getAnnouncements(
    @User() user: DecodedIdToken,
  ): Promise<AnnouncementsResponseDto> {
    const requester = await this.userStoreService.findOneByFirebaseId(user.uid);
    if (!requester.house) {
      throw new HttpException('user is not in a house', HttpStatus.NOT_FOUND);
    }

    const house = await this.houseStoreService.findOne(requester.house);
    const announcements =
      await this.announcementStoreService.findAllByHouseCode(house.code);

    const announcementDTOs = await Promise.all(
      announcements.map((announcement) => {
        return this.announcementUtil.convertAnnouncementDocumentToResponseDTO(
          announcement,
          this.userStoreService,
        );
      }),
    );

    return { announcements: announcementDTOs };
  }
}
