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
import { IssueModel } from '../../db/issue/issue.schema';
import { IssueStoreService } from '../../db/issue/issueStore.service';
import { UserStoreService } from '../../db/user/userStore.service';
import { User } from '../../util/user.decorator';
import { CreateIssueDto } from './dto/create-issue.dto';
import { IssueResponseDto, IssuesResponseDto } from './dto/issue-response.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { ResolveIssueDto } from './dto/resolve-issue.dto';
import { IssueUtil } from './issues.util';
import { Auth } from '../../util/auth.decorator';

@ApiTags('issues')
@Controller('/api/v1/house/issues')
@Auth()
export class IssueController {
  constructor(
    private readonly issueStoreService: IssueStoreService,
    private readonly userStoreService: UserStoreService,
    private readonly issueUtil: IssueUtil,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all issues in the users flat.' })
  @ApiOkResponse({
    description: 'Issues retrieved successfully',
    type: IssuesResponseDto,
  })
  @ApiBadRequestResponse({ description: 'User is not in a house' })
  async getIssues(@User() user: DecodedIdToken): Promise<IssuesResponseDto> {
    const houseID = (await this.userStoreService.findOneByFirebaseId(user.uid))
      ?.house;

    if (!houseID) {
      throw new HttpException('user is not in a house', HttpStatus.BAD_REQUEST);
    }

    return {
      issues: await Promise.all(
        (
          await this.issueStoreService.findAllForHouse(houseID)
        ).map((issue) => {
          return this.issueUtil.covertIssueDocumentToResponseDTO(
            issue,
            this.userStoreService,
          );
        }),
      ),
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new issue resource' })
  @ApiCreatedResponse({
    description: 'Issue created successfully',
    type: IssueResponseDto,
  })
  async createIssue(
    @Body() createIssueDto: CreateIssueDto,
    @User() user: DecodedIdToken,
  ): Promise<IssueResponseDto> {
    const logger = await this.userStoreService.findOneByFirebaseId(user.uid);
    const currentDate = new Date();

    const issueModel: IssueModel = {
      name: createIssueDto.name,
      description: createIssueDto.description,
      image: createIssueDto.image,
      house: logger.house,
      logger: logger._id,
      loggedDate: currentDate,
      resolved: createIssueDto.resolved,
    };
    const issue = await this.issueStoreService.create(issueModel);
    return {
      id: issue._id,
      name: issue.name,
      image: issue.image,
      description: issue.description,
      logger: logger.firebaseId,
      loggedDate: issue.loggedDate.getTime(),
      resolved: issue.resolved,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an issue.' })
  @ApiOkResponse({
    description: 'Issue updated successfully',
    type: IssueResponseDto,
  })
  @ApiForbiddenResponse({ description: 'Not the issue logger' })
  async updateIssue(
    @Param('id') id: string,
    @Body() updateIssueDto: UpdateIssueDto,
    @User() user: DecodedIdToken,
  ): Promise<IssueResponseDto> {
    const issue = await this.issueStoreService.findOne(id);
    const userObject = await this.userStoreService.findOneByFirebaseId(
      user.uid,
    );

    if (!issue.logger.equals(userObject._id)) {
      throw new HttpException('not the issue logger', HttpStatus.FORBIDDEN);
    }

    const issueDocument = await this.issueStoreService.update(
      issue._id,
      updateIssueDto,
    );
    return this.issueUtil.covertIssueDocumentToResponseDTO(
      issueDocument,
      this.userStoreService,
    );
  }

  @Put(':id/resolve')
  @ApiOperation({ summary: 'Mark a user as having resolved an issue.' })
  @ApiOkResponse({
    description: 'Issue resolved successfully',
    type: IssueResponseDto,
  })
  async updateIssueResolved(
    @Param('id') id: string,
    @Body() resolveIssueDto: ResolveIssueDto,
    @User() user: DecodedIdToken,
  ): Promise<IssueResponseDto> {
    const issue = await this.issueStoreService.findOne(id);
    const userObject = await this.userStoreService.findOneByFirebaseId(
      user.uid,
    );

    if (!issue.logger.equals(userObject._id)) {
      throw new HttpException('not the issue logger', HttpStatus.FORBIDDEN);
    }

    const issueDocument = await this.issueStoreService.update(
      issue._id,
      resolveIssueDto,
    );

    return this.issueUtil.covertIssueDocumentToResponseDTO(
      issueDocument,
      this.userStoreService,
    );
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get an issue.' })
  @ApiOkResponse({
    description: 'Issue retrieved successfully',
    type: IssueResponseDto,
  })
  @ApiBadRequestResponse({ description: 'User is not in a house' })
  async getIssue(
    @Param('id') id: string,
    @User() user: DecodedIdToken,
  ): Promise<IssueResponseDto> {
    const houseID = (await this.userStoreService.findOneByFirebaseId(user.uid))
      ?.house;

    if (!houseID) {
      throw new HttpException('user is not in a house', HttpStatus.BAD_REQUEST);
    }

    const issue = await this.issueStoreService.findOne(id);

    return this.issueUtil.covertIssueDocumentToResponseDTO(
      issue,
      this.userStoreService,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete an issue.' })
  @ApiNoContentResponse({
    description: 'Issue deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Not the issue logger' })
  async deleteIssue(
    @Param('id') id: string,
    @User() user: DecodedIdToken,
  ): Promise<void> {
    const issue = await this.issueStoreService.findOne(id);

    const userObject = await this.userStoreService.findOneByFirebaseId(
      user.uid,
    );

    if (!issue.logger.equals(userObject._id)) {
      throw new HttpException('not the issue logger', HttpStatus.FORBIDDEN);
    }

    this.issueStoreService.delete(id);
  }
}
