import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Anime } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async getHello(): Promise<Anime> {
    const anime = await this.prisma.anime.findFirst({
      include: {
        Author: true,
        Genre: true,
        Studio: true,
        Character: true,
      },
    });
    return anime;
  }
}
