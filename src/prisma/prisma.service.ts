import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
      //log: ['query', 'info', 'warn', 'error'],
    });
  }

  cleanDB() {
    return this.$transaction([
      this.user.deleteMany(),
      this.anime.deleteMany(),
      this.author.deleteMany(),
      this.character.deleteMany(),
      this.genre.deleteMany(),
      this.studio.deleteMany(),
    ]);
  }
}
