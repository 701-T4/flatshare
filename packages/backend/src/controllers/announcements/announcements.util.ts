import { Injectable } from '@nestjs/common';
import { AnnouncementDocument } from '../../db/announcement/announcement.schema';
import { AnnouncementResponseDto } from './dto/announcement-response.dto';
import { UserStoreService } from '../..//db/user/userStore.service';

@Injectable()
export class AnnouncementUtil {
  async convertAnnouncementDocumentToResponseDTO(
    announcementDocument: AnnouncementDocument,
    userStoreService: UserStoreService,
  ): Promise<AnnouncementResponseDto> {
    return {
      title: announcementDocument.title,
      description: announcementDocument.description,
      author: (await userStoreService.findOne(announcementDocument.author))
        .name,
      houseCode: announcementDocument.houseCode,
      dateCreated: announcementDocument._id.getTimestamp(),
    };
  }
}
