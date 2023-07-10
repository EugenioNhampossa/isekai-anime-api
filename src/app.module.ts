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
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
