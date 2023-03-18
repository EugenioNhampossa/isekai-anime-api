import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { userPayload } from '../@types/userPayload.types';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'refresh-secret-key',
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
