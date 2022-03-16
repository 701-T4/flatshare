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

@ApiTags('bills')
@Controller('/api/v1/house/bills')
export class BillController {
  constructor(
    private readonly billStoreService: BillStoreService,
    private readonly userStoreService: UserStoreService,
    private readonly billUtil: BillUtil,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all bills in the users flat.' })
  @ApiCreatedResponse({
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
  @ApiCreatedResponse({
    description: 'Bill updated successfully',
    type: BillResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'not the bill owner' })
  async updateBill(
    @Param() id: string,
    @Body() updateBillDto: UpdateBillDto,
    @User() user: DecodedIdToken,
  ): Promise<BillResponseDto> {
    const bill = await this.billStoreService.findOne(id);
    if (
      bill.owner ===
      (await this.userStoreService.findOneByFirebaseId(user.uid))._id
    ) {
      return this.billUtil.covertBillDocumentToResponseDTO(
        await this.billStoreService.update(bill._id, updateBillDto),
        this.userStoreService,
      );
    } else
      throw new HttpException('not the bill owner', HttpStatus.UNAUTHORIZED);
  }

  @Put(':id/payment')
  @ApiOperation({ summary: 'Mark a user as having paid or unpaid a bill.' })
  @ApiCreatedResponse({
    description: 'Bill marked successfully',
    type: BillResponseDto,
  })
  async updateBillPayment(
    @Param() id: string,
    @Body() payBillDto: PayBillDto,
    @User() user: DecodedIdToken,
  ): Promise<BillResponseDto> {
    const bill = await this.billStoreService.findOne(id);
    const userID = (await this.userStoreService.findOneByFirebaseId(user.uid))
      ._id;
    bill.users.map((u) => {
      if (u.id === userID) {
        u.paid = payBillDto.paid;
        u.proof = payBillDto.proof;
      }
    });
    return this.billUtil.covertBillDocumentToResponseDTO(
      await this.billStoreService.update(bill._id, bill),
      this.userStoreService,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a bill.' })
  @ApiCreatedResponse({
    description: 'Bill deleted successfully',
    type: BillResponseDto,
  })
  async deleteBill(
    @Param() id: string,
    @User() user: DecodedIdToken,
  ): Promise<BillResponseDto> {
    const bill = await this.billStoreService.findOne(id);
    if (
      bill.owner ===
      (await this.userStoreService.findOneByFirebaseId(user.uid))._id
    ) {
      return this.billUtil.covertBillDocumentToResponseDTO(
        await this.billStoreService.delete(bill._id),
        this.userStoreService,
      );
    } else
      throw new HttpException('not the bill owner', HttpStatus.UNAUTHORIZED);
  }
}
