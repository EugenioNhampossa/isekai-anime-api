import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { userPayload } from '../@types/userPayload.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('REFRESH_KEY'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: userPayload) {
    const refreshToken = req.headers.authorization.replace('Bearer', '').trim();
    return {
      ...payload,
      refreshToken,
    };
  }
}
