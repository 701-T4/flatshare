import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('bills')
@Controller('/api/v1/house/bills')
export class BillController {
  @Get()
  @ApiOperation({ summary: 'Retrieve all bills in the users flat.' })
  @ApiCreatedResponse({
    description: 'Bill retrieved successfully',
    type: String,
  })
  async getBills(): Promise<string> {
    return 'Get Bills';
  }

  @Post()
  @ApiOperation({ summary: 'Create a new bill.' })
  @ApiCreatedResponse({
    description: 'Bill created successfully',
    type: String,
  })
  async createBill(): Promise<string> {
    return 'Create a Bill';
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a bill.' })
  @ApiCreatedResponse({
    description: 'Bill update successfully',
    type: String,
  })
  async updateBill(@Param() id: string): Promise<string> {
    return `Update a Bill ${id}`;
  }

  @Put(':id/payment')
  @ApiOperation({ summary: 'Mark a user as having paid or unpaid a bill.' })
  @ApiCreatedResponse({
    description: 'Bill marked successfully',
    type: String,
  })
  async updateBillPayment(@Param() id: string): Promise<string> {
    return `Mark a Bill ${id}`;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a bill.' })
  @ApiCreatedResponse({
    description: 'Bill deleted successfully',
    type: String,
  })
  async deleteBill(@Param() id: string): Promise<string> {
    return `Delete a Bill ${id}`;
  }
}
