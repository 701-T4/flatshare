import { Injectable } from '@nestjs/common';
import { IssueDocument } from '../../db/issue/issue.schema';
import { UserStoreService } from '../../db/user/userStore.service';
import { IssueResponseDto } from './dto/issue-response.dto';

@Injectable()
export class IssueUtil {
  async covertIssueDocumentToResponseDTO(
    issueDocument: IssueDocument,
    userStoreService: UserStoreService,
  ): Promise<IssueResponseDto> {
    return {
      id: issueDocument._id,
      name: issueDocument.name,
      image: issueDocument.image,
      description: issueDocument.description,
      logger: (await userStoreService.findOne(issueDocument.logger)).firebaseId,
      loggedDate: issueDocument.loggedDate.getTime(),
      resolved: issueDocument.resolved,
    };
  }
}
