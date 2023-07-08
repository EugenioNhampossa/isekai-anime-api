import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { GenreModule } from './genre/genre.module';
import { AuthorModule } from './author/author.module';
import { StudioModule } from './studio/studio.module';
import { CharacterModule } from './character/character.module';
import { AnimeModule } from './anime/anime.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    GenreModule,
    AuthorModule,
    StudioModule,
    CharacterModule,
    AnimeModule,
  ],
})
export class AppModule {}
