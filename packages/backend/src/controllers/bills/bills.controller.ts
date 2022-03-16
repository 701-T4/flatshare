/* eslint-disable */
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
import { Types, ObjectId } from 'mongoose';
import { BillResponseDto } from './dto/bill-response.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { PayBillDto } from './dto/pay-bill.dto';

@ApiTags('bills')
@Controller('/api/v1/house/bills')
export class BillController {
  constructor(
    private readonly billStoreService: BillStoreService,
    private readonly userStoreService: UserStoreService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all bills in the users flat.' })
  @ApiCreatedResponse({
    description: 'Bills retrieved successfully',
    type: String,
  })
  async getBills(): Promise<string> {
    return 'Get Bills';
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
    const billModel: BillModel = {
      name: createBillDto.name,
      description: createBillDto.description,
      owner: (await this.userStoreService.findOneByFirebaseId(user.uid))._id,
      due: new Date(createBillDto.due),
      users: createBillDto.users.map((u) => {
        return {
          id: new Types.ObjectId(u.id),
          amount: u.amount,
          paid: u.paid,
          proof: u.proof,
        };
      }),
    };
    const bill = await this.billStoreService.create(billModel);
    return {
      name: bill.name,
      description: bill.description,
      owner: user.uid,
      due: bill.due.getTime(),
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
      this.billStoreService.update(bill._id, updateBillDto);
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
  ): Promise<BillResponseDto> {
    return `Mark a Bill ${id}`;
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
      this.billStoreService.delete(bill._id);
    } else
      throw new HttpException('not the bill owner', HttpStatus.UNAUTHORIZED);
  }
}
