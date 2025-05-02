import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { StreamClient, UserRequest } from '@stream-io/node-sdk';
import { UserService } from 'src/user/user.service';
import { v4 as uuidv4 } from 'uuid';
import { LiveStream } from './entities/live-stream.entity';
import { Repository } from 'typeorm';
@Injectable()
export class LivestreamingService {
  constructor(
    private userService: UserService,
    @InjectRepository(LiveStream)
    private liveStreamRepository: Repository<LiveStream>,
  ) {}

  configService = new ConfigService();
  apiKey = this.configService.get<string>('STREAM_API_KEY')!;
  apiSecret = this.configService.get<string>('STREAM_API_SECRET')!;
  client = new StreamClient(this.apiKey, this.apiSecret);

  async createUser(id: string) {
    const userData = await this.userService.findOne(id);

    const userRequest: UserRequest = {
      id: id,
      role: userData!.role,
      name: userData!.username,
      image: userData!.image,
    };
    const newUser = await this.client.upsertUsers([userRequest]);

    const token = this.client.generateUserToken({
      user_id: id,
      validity_in_seconds: 3600,
    });

    return {
      user: newUser,
      token: token,
    };
  }

  async createLiveStream(id: string) {
    const callType = 'livestream';
    const streamId = uuidv4();
    const call = this.client.video.call(callType, streamId);

    call.create({
      data: {
        created_by_id: id,
        members: [{ user_id: id, role: 'user' }],
      },
    });

    let members: string[] = [];
    members.push(id);

    const stream = this.liveStreamRepository.create({
      id: streamId,
      userId: id,
      members: members,
    });

    await this.liveStreamRepository.save(stream);

    return {
      streamId: streamId,
      callType: callType,
    };
  }

  async joinLiveStream(id: string, streamId: string) {
    const callType = 'livestream';
    const call = this.client.video.call(callType, streamId);

    const userData = await this.userService.findOne(id);

    call.updateCallMembers({
      update_members: [{ user_id: id, role: userData!.role }],
    });

    const stream = await this.liveStreamRepository.findOne({
      where: { id: streamId },
    });

    if (!stream!.members!.find((el) => el === id)) {
      stream!.members!.push(id);
    }

    await this.liveStreamRepository.save(stream!);

    return {
      streamId: streamId,
      callType: callType,
      members: stream!.members,
    };
  }

  async leaveLiveStream(id: string, streamId: string) {
    const callType = 'livestream';
    const call = this.client.video.call(callType, streamId);

    call.updateCallMembers({
      remove_members: [id],
    });

    const stream = await this.liveStreamRepository.findOne({
      where: { id: streamId },
    });

    stream!.members = stream!.members!.filter((member) => member !== id);

    await this.liveStreamRepository.save(stream!);

    return { message: 'User removed from the call' };
  }

  findOneLiveStream(id: string) {
    return this.liveStreamRepository.findOne({
      where: { id: id },
    });
  }
}
