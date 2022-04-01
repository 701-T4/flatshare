import { Injectable } from '@nestjs/common';
import { AnnouncementDocument } from 'src/db/announcement/announcement.schema';
import { AnnouncementResponseDto } from './dto/announcement-response.dto';
import { UserStoreService } from 'src/db/user/userStore.service';

@Injectable()
export class AnnouncementUtil {
  async converAnnouncementDocumentToResponseDTO(
    announcementDocument: AnnouncementDocument,
    userStoreService: UserStoreService,
  ): Promise<AnnouncementResponseDto> {
    return {
      title: announcementDocument.title,
      description: announcementDocument.description,
      author: (await userStoreService.findOne(announcementDocument.author))
        .name,
      houseCode: announcementDocument.houseCode,
    };
  }
}
