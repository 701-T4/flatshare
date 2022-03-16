import { Injectable } from '@nestjs/common';
import { BillDocument } from 'src/db/bill/bill.schema';
import { UserStoreService } from 'src/db/user/userStore.service';
import { BillResponseDto } from './dto/bill-response.dto';

@Injectable()
export class BillUtil {
  async covertBillDocumentToResponseDTO(
    billDocument: BillDocument,
    userStoreService: UserStoreService,
  ): Promise<BillResponseDto> {
    const users = await Promise.all(
      billDocument.users.map(async (u) => {
        return {
          id: (await userStoreService.findOne(u.id)).firebaseId,
          amount: u.amount,
          paid: u.paid,
          proof: u.proof,
        };
      }),
    );
    return {
      name: billDocument.name,
      description: billDocument.description,
      owner: (await userStoreService.findOne(billDocument.owner)).firebaseId,
      due: billDocument.due.getTime(),
      users: users,
    };
  }
}
