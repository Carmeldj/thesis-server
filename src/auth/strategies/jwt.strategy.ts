import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'kekekkekkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
    });
  }

  async validate(payload: any) {
    console.log('payload', payload);
    return { userId: payload.sub, email: payload.email };
  }
}
