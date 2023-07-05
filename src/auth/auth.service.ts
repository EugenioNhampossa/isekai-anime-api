import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './@types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async localSignup(dto: AuthDTO): Promise<Tokens> {
    const hash = await this.hashData(dto.password);
    const user = await this.prismaService.user
      .create({
        data: {
          email: dto.email,
          hash,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
        throw error;
      });
    const tokens = await this.getTokens(user.id, user.role, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async localSignin(dto: AuthDTO): Promise<Tokens> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid email or password');
    }
    const matches = await bcrypt.compare(dto.password, user.hash);

    if (!matches) {
      throw new ForbiddenException('Invalid email or password');
    }
    const tokens = await this.getTokens(user.id, user.role, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: string) {
    await this.prismaService.user.updateMany({
      where: {
        id: userId,
        hashRt: {
          not: null,
        },
      },
      data: {
        hashRt: null,
      },
    });
  }

  async refreshTokens(userId: string, rt: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ForbiddenException('Access Denied');

    const matches = bcrypt.compare(rt, user.hashRt);

    if (!matches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.role, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRtHash(userId: string, rt: string) {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashRt: rt,
      },
    });
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(
    userId: string,
    role: string,
    email: string,
  ): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: this.config.get('ACCESS_KEY'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: this.config.get('REFRESH_KEY'),
          expiresIn: '168h',
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
