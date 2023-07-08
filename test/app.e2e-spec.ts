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
    describe('Create new Author', () => {
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
    });

    describe('List all authors', () => {
      it('should create a new author', () => {
        return pactum.spec().get('/authors').expectStatus(200);
      });
    });

    describe('Get one author', () => {
      it('should get one author', () => {
        return pactum
          .spec()
          .get('/authors/{id}')
          .withPathParams('id', '$S{authorId}')
          .expectStatus(200);
      });
    });

    describe('Create not create an Author', () => {
      it('should not create a new author without authorization', () => {
        return pactum.spec().post('/authors').expectStatus(401).withBody({
          name: 'Author´s name',
        });
      });
    });
  });

  describe('Genre', () => {
    describe('Create new Genre', () => {
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
    });

    describe('List all genres', () => {
      it('should create a new genre', () => {
        return pactum.spec().get('/genres').inspect().expectStatus(200);
      });
    });

    describe('Get one genre', () => {
      it('should get one genre', () => {
        return pactum
          .spec()
          .get('/genres/{id}')
          .withPathParams('genreId', '$S{id}')
          .expectStatus(200);
      });
    });

    describe('Create not create a genre', () => {
      it('should not create a new author without authorization', () => {
        return pactum.spec().post('/genres').expectStatus(401).withBody({
          name: 'Genre´s name',
        });
      });
    });
  });

  describe('Studio', () => {
    describe('Create new Studio', () => {
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
    });

    describe('List all studios', () => {
      it('should create a new studio', () => {
        return pactum.spec().get('/studios').inspect().expectStatus(200);
      });
    });

    describe('Get one studio', () => {
      it('should get one studio', () => {
        return pactum
          .spec()
          .get('/studios/{id}')
          .withPathParams('studioId', '$S{id}')
          .expectStatus(200);
      });
    });

    describe('Create not create a studio', () => {
      it('should not create a new studio without authorization', () => {
        return pactum.spec().post('/studios').expectStatus(401).withBody({
          name: 'Genre´s name',
        });
      });
    });
  });
});
