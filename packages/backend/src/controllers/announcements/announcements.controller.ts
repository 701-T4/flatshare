import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../util/auth.decorator';

@ApiTags('issues')
@Controller('/api/v1/house/issues')
@Auth()
export class AnnouncementController {}
