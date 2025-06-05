import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { LivestreamingService } from 'src/livestreaming/livestreaming.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private livestreamingService: LivestreamingService, // Assuming you have a LivestreamingService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    const userExists = await this.usersService.findByEmail(user.email);
    const streamUser = await this.livestreamingService.createUser(
      userExists.id,
    );
    return {
      user: userExists,
      token: streamUser.token,
      access_token: this.jwtService.sign(payload),
    };
  }
}
