import { Module } from '@nestjs/common';
import { LivestreamingService } from './livestreaming.service';
import { LivestreamingController } from './livestreaming.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LiveStream } from './entities/live-stream.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([LiveStream])],
  controllers: [LivestreamingController],
  providers: [LivestreamingService],
  exports: [LivestreamingService],
})
export class LivestreamingModule {}
