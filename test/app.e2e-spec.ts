import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';
import { PrismaService } from './../src/prisma/prisma.service';
import { AuthDTO } from './../src/auth/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);
    await prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('Signup', () => {
      const dto: AuthDTO = {
        email: 'test@gmail.com',
        password: '1234',
        role: 'ADMIN',
      };

      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it('should throw if empty', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .stores('token', 'access_token');
      });
    });

    describe('Signin', () => {
      const dto: AuthDTO = {
        email: 'test@gmail.com',
        password: '1234',
      };

      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it('should throw if empty', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });

      it('should not signin(invalid email)', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: 'fail@gmail.com',
            password: '1234',
          })
          .expectStatus(403);
      });

      it('should not signin(invalid pass)', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: 'test@gmail.com',
            password: 'failpass',
          })
          .expectStatus(403);
      });

      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('access_token', 'access_token')
          .stores('refresh_token', 'refresh_token');
      });
    });
    describe('logout', () => {
      it('should logout', () => {
        return pactum
          .spec()
          .withHeaders({ Authorization: 'Bearer $S{access_token}' })
          .post('/auth/logout')
          .expectStatus(200);
      });

      it('should  not logout', () => {
        return pactum.spec().post('/auth/logout').expectStatus(401);
      });
    });
  });

  describe('User', () => {
    describe('Get current user', () => {
      it('should get curent user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .expectStatus(200)
          .withHeaders({ Authorization: 'Bearer $S{access_token}' });
      });
    });
  });

  describe('Author', () => {
    it('should create a new author', () => {
      return pactum
        .spec()
        .post('/authors')
        .expectStatus(201)
        .withBody({
          name: 'Author´s name',
        })
        .stores('authorId', 'id')
        .withHeaders({ Authorization: 'Bearer $S{access_token}' });
    });

    it('should create a new author', () => {
      return pactum.spec().get('/authors').expectStatus(200);
    });

    it('should get one author', () => {
      return pactum
        .spec()
        .get('/authors/{id}')
        .withPathParams('id', '$S{authorId}')
        .expectStatus(200);
    });

    it('should not create a new author without authorization', () => {
      return pactum.spec().post('/authors').expectStatus(401).withBody({
        name: 'Author´s name',
      });
    });
  });

  describe('Genre', () => {
    it('should create a new genre', () => {
      return pactum
        .spec()
        .post('/genres')
        .expectStatus(201)
        .withBody({
          title: 'genres´s name',
          decription: 'description',
        })
        .stores('genreId', 'id')
        .withHeaders({ Authorization: 'Bearer $S{access_token}' });
    });

    it('should list all genres', () => {
      return pactum.spec().get('/genres').expectStatus(200);
    });

    it('should get one genre', () => {
      return pactum
        .spec()
        .get('/genres/{id}')
        .withPathParams('id', '$S{genreId}')
        .expectStatus(200);
    });

    it('should not create a new author without authorization', () => {
      return pactum.spec().post('/genres').expectStatus(401).withBody({
        name: 'Genre´s name',
      });
    });
  });

  describe('Studio', () => {
    it('should create a new studio', () => {
      return pactum
        .spec()
        .post('/studios')
        .expectStatus(201)
        .withBody({
          name: 'studios´s name',
        })
        .stores('studioId', 'id')
        .withHeaders({ Authorization: 'Bearer $S{access_token}' });
    });

    it('should create a new studio', () => {
      return pactum.spec().get('/studios').expectStatus(200);
    });

    it('should get one studio', () => {
      return pactum
        .spec()
        .get('/studios/{id}')
        .withPathParams('id', '$S{studioId}')
        .expectStatus(200);
    });

    it('should not create a new studio without authorization', () => {
      return pactum.spec().post('/studios').expectStatus(401).withBody({
        name: 'Studios´s name',
      });
    });
  });

  describe('Anime', () => {
    it('should create a new anime', () => {
      return pactum
        .spec()
        .post('/animes')
        .expectStatus(201)
        .withBody({
          title: 'anime title',
          id_author: '$S{authorId}',
          id_studio: '$S{studioId}',
          synopsis: 'anime synopis',
          image: 'image url',
          episodes: 12,
          seasons: 1,
          releaseDate: '2023-07-09T18:14:19.124Z',
        })
        .stores('animeId', 'id')
        .withHeaders({ Authorization: 'Bearer $S{access_token}' });
    });

    it('should list all animes', () => {
      return pactum.spec().get('/animes').expectStatus(200);
    });

    it('should get one anime', () => {
      return pactum
        .spec()
        .get('/animes/{id}')
        .withPathParams('id', '$S{animeId}')
        .expectStatus(200);
    });

    it('should not create a new anime without authorization', () => {
      return pactum.spec().post('/animes').expectStatus(401);
    });
  });

  describe('Character', () => {
    it('should create a new character', () => {
      return pactum
        .spec()
        .post('/characters')
        .expectStatus(201)
        .withBody({
          id_anime: '$S{animeId}',
          image: 'image url',
          name: 'character´s name',
        })
        .stores('characterId', 'id')
        .withHeaders({ Authorization: 'Bearer $S{access_token}' });
    });

    it('should list all characters', () => {
      return pactum.spec().get('/characters').expectStatus(200);
    });

    it('should get one character', () => {
      return pactum
        .spec()
        .get('/characters/{id}')
        .withPathParams('id', '$S{characterId}')
        .inspect()
        .expectStatus(200);
    });

    it('should not create a new character without authorization', () => {
      return pactum.spec().post('/characters').expectStatus(401).withBody({
        name: 'Character´s name',
      });
    });
  });
});
