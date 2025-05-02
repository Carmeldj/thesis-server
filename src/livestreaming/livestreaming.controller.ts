import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LivestreamingService } from './livestreaming.service';

@Controller('livestreaming')
export class LivestreamingController {
  constructor(private readonly livestreamingService: LivestreamingService) {}
  @Post(':id')
  createUser(@Param('id') id: string) {
    return this.livestreamingService.createUser(id);
  }

  @Post('livestream/:userId')
  createLiveStream(@Param('userId') userId: string) {
    return this.livestreamingService.createLiveStream(userId);
  }

  @Post('livestream/:userId/:streamId')
  joinLiveStream(
    @Param('userId') userId: string,
    @Param('streamId') streamId: string,
  ) {
    return this.livestreamingService.joinLiveStream(userId, streamId);
  }

  @Delete('livestream/:userId/:streamId/')
  leaveLiveStream(
    @Param('userId') userId: string,
    @Param('streamId') streamId: string,
  ) {
    return this.livestreamingService.leaveLiveStream(userId, streamId);
  }

  @Get('livestream/:streamId')
  getLiveStream(@Param('streamId') streamId: string) {
    return this.livestreamingService.findOneLiveStream(streamId);
  }
}
