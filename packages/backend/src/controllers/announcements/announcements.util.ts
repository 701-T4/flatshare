import { Injectable } from '@nestjs/common';
import { AnnouncementDocument } from '../../db/announcement/announcement.schema';
import { AnnouncementResponseDto } from './dto/announcement-response.dto';
import { UserStoreService } from '../..//db/user/userStore.service';

@Injectable()
export class AnnouncementUtil {
  /**
   * Converts a supplied announcementDocument into a DTO representation of an Announcement
   * Along with the document fields, the DTO contains a creation date and an author name.
   * @param announcementDocument
   * @param userStoreService
   * @returns An AnnouncementResponseDTO which contains all the announcement's information.
   */
  async convertAnnouncementDocumentToResponseDTO(
    announcementDocument: AnnouncementDocument,
    userStoreService: UserStoreService,
  ): Promise<AnnouncementResponseDto> {
    return {
      title: announcementDocument.title,
      description: announcementDocument.description,
      author: (await userStoreService.findOne(announcementDocument.author))
        .name, //replace the author ID with their name.
      houseCode: announcementDocument.houseCode,
      dateCreated: announcementDocument._id.getTimestamp(),
    };
  }
}
