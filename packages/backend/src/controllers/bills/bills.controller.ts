import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Delete,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DecodedIdToken } from 'firebase-admin/auth';
import { BillModel } from 'src/db/bill/bill.schema';
import { BillStoreService } from 'src/db/bill/billStore.service';
import { UserStoreService } from 'src/db/user/userStore.service';
import { User } from 'src/util/user.decorator';
import { CreateBillDto } from './dto/create-bill.dto';
import { BillResponseDto, BillsResponseDto } from './dto/bill-response.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { PayBillDto } from './dto/pay-bill.dto';
import { BillUtil } from './bills.util';
import { Auth } from '../../util/auth.decorator';

@ApiTags('bills')
@Controller('/api/v1/house/bills')
@Auth()
export class BillController {
  constructor(
    private readonly billStoreService: BillStoreService,
    private readonly userStoreService: UserStoreService,
    private readonly billUtil: BillUtil,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all bills in the users flat.' })
  @ApiOkResponse({
    description: 'Bills retrieved successfully',
    type: String,
  })
  async getBills(@User() user: DecodedIdToken): Promise<BillsResponseDto> {
    const houseID = (await this.userStoreService.findOneByFirebaseId(user.uid))
      .house;

    return {
      bills: await Promise.all(
        (
          await this.billStoreService.findAllForHouse(houseID)
        ).map((bill) => {
          return this.billUtil.covertBillDocumentToResponseDTO(
            bill,
            this.userStoreService,
          );
        }),
      ),
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new bill resource' })
  @ApiCreatedResponse({
    description: 'Bill created successfully',
    type: BillResponseDto,
  })
  async createBill(
    @Body() createBillDto: CreateBillDto,
    @User() user: DecodedIdToken,
  ): Promise<BillResponseDto> {
    const owner = await this.userStoreService.findOneByFirebaseId(user.uid);
    const users = await Promise.all(
      createBillDto.users.map(async (u) => {
        return {
          id: (await this.userStoreService.findOneByFirebaseId(user.uid))._id,
          amount: u.amount,
          paid: u.paid,
          proof: u.proof,
        };
      }),
    );
    const billModel: BillModel = {
      name: createBillDto.name,
      description: createBillDto.description,
      house: owner.house,
      owner: owner._id,
      due: new Date(createBillDto.due),
      users: users,
    };
    const bill = await this.billStoreService.create(billModel);
    return {
      name: bill.name,
      description: bill.description,
      owner: owner.firebaseId,
      due: createBillDto.due,
      users: createBillDto.users,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a bill.' })
  @ApiOkResponse({
    description: 'Bill updated successfully',
    type: BillResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'not the bill owner' })
  async updateBill(
    @Param() idObject: string,
    @Body() updateBillDto: UpdateBillDto,
    @User() user: DecodedIdToken,
  ): Promise<BillResponseDto> {
    const billId = idObject['id'];
    const bill = await this.billStoreService.findOne(billId);
    const userObject = await this.userStoreService.findOneByFirebaseId(
      user.uid,
    );

    if (bill.owner.valueOf() === userObject._id.valueOf()) {
      const billDocument = await this.billStoreService.update(
        bill._id,
        updateBillDto,
      );
      return this.billUtil.covertBillDocumentToResponseDTO(
        billDocument,
        this.userStoreService,
      );
    } else
      throw new HttpException('not the bill owner', HttpStatus.UNAUTHORIZED);
  }

  @Put(':id/payment')
  @ApiOperation({ summary: 'Mark a user as having paid or unpaid a bill.' })
  @ApiOkResponse({
    description: 'Bill marked successfully',
    type: BillResponseDto,
  })
  async updateBillPayment(
    @Param() idObject: string,
    @Body() payBillDto: PayBillDto,
    @User() user: DecodedIdToken,
  ): Promise<BillResponseDto> {
    const billId = idObject['id'];
    const bill = await this.billStoreService.findOne(billId);
    const userObject = await this.userStoreService.findOneByFirebaseId(
      user.uid,
    );
    bill.users.map((u) => {
      if (u.id.valueOf() === userObject._id.valueOf()) {
        u.paid = payBillDto.paid;
        u.proof = payBillDto.proof;
        console.log(u);
      }
    });
    //TODO: Fix the bug of not returning the paid and proof values
    return this.billUtil.covertBillDocumentToResponseDTO(
      await this.billStoreService.update(bill._id, bill),
      this.userStoreService,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a bill.' })
  @ApiNoContentResponse({
    description: 'Bill deleted successfully',
    type: BillResponseDto,
  })
  async deleteBill(
    @Param() idObject: string,
    @User() user: DecodedIdToken,
  ): Promise<BillResponseDto> {
    const billId = idObject['id'];
    const bill = await this.billStoreService.findOne(billId);

    const userObject = await this.userStoreService.findOneByFirebaseId(
      user.uid,
    );

    if (bill.owner.valueOf() === userObject._id.valueOf()) {
      return this.billUtil.covertBillDocumentToResponseDTO(
        await this.billStoreService.delete(billId),
        this.userStoreService,
      );
    } else
      throw new HttpException('not the bill owner', HttpStatus.UNAUTHORIZED);
  }
}
