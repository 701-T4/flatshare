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
  HttpCode,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { DecodedIdToken } from 'firebase-admin/auth';
import { BillModel } from '../../db/bill/bill.schema';
import { BillStoreService } from '../../db/bill/billStore.service';
import { UserStoreService } from '../../db/user/userStore.service';
import { User } from '../../util/user.decorator';
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
    type: BillsResponseDto,
  })
  @ApiBadRequestResponse({ description: 'User is not in a house' })
  async getBills(@User() user: DecodedIdToken): Promise<BillsResponseDto> {
    const houseID = (await this.userStoreService.findOneByFirebaseId(user.uid))
      ?.house;

    if (!houseID) {
      throw new HttpException('user is not in a house', HttpStatus.BAD_REQUEST);
    }

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
          id: (await this.userStoreService.findOneByFirebaseId(u.id))._id,
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
      id: bill._id,
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
  @ApiForbiddenResponse({ description: 'Not the bill owner' })
  async updateBill(
    @Param('id') id: string,
    @Body() updateBillDto: UpdateBillDto,
    @User() user: DecodedIdToken,
  ): Promise<BillResponseDto> {
    const bill = await this.billStoreService.findOne(id);
    const userObject = await this.userStoreService.findOneByFirebaseId(
      user.uid,
    );

    if (!bill.owner.equals(userObject._id)) {
      throw new HttpException('not the bill owner', HttpStatus.FORBIDDEN);
    }

    const billDocument = await this.billStoreService.update(
      bill._id,
      updateBillDto,
    );
    return this.billUtil.covertBillDocumentToResponseDTO(
      billDocument,
      this.userStoreService,
    );
  }

  @Put(':id/payment')
  @ApiOperation({ summary: 'Mark a user as having paid or unpaid a bill.' })
  @ApiOkResponse({
    description: 'Bill marked successfully',
    type: BillResponseDto,
  })
  async updateBillPayment(
    @Param('id') id: string,
    @Body() payBillDto: PayBillDto,
    @User() user: DecodedIdToken,
  ): Promise<BillResponseDto> {
    const bill = await this.billStoreService.findOne(id);
    const userObject = await this.userStoreService.findOneByFirebaseId(
      user.uid,
    );
    bill.users.forEach((u) => {
      if (u.id.equals(userObject._id)) {
        u.paid = payBillDto.paid;
        u.proof = payBillDto.proof;
      }
    });
    return this.billUtil.covertBillDocumentToResponseDTO(
      await this.billStoreService.update(bill._id, bill),
      this.userStoreService,
    );
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get a bill.' })
  @ApiOkResponse({
    description: 'Bills retrieved successfully',
    type: BillResponseDto,
  })
  @ApiBadRequestResponse({ description: 'User is not in a house' })
  async getBill(
    @Param('id') id: string,
    @User() user: DecodedIdToken,
  ): Promise<BillResponseDto> {
    const houseID = (await this.userStoreService.findOneByFirebaseId(user.uid))
      ?.house;

    if (!houseID) {
      throw new HttpException('user is not in a house', HttpStatus.BAD_REQUEST);
    }

    const bill = await this.billStoreService.findOne(id);

    return this.billUtil.covertBillDocumentToResponseDTO(
      bill,
      this.userStoreService,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a bill.' })
  @ApiNoContentResponse({
    description: 'Bill deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Not the bill owner' })
  async deleteBill(
    @Param('id') id: string,
    @User() user: DecodedIdToken,
  ): Promise<void> {
    const bill = await this.billStoreService.findOne(id);

    const userObject = await this.userStoreService.findOneByFirebaseId(
      user.uid,
    );

    if (!bill.owner.equals(userObject._id)) {
      throw new HttpException('not the bill owner', HttpStatus.FORBIDDEN);
    }

    this.billStoreService.delete(id);
  }
}
