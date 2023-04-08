import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('TripsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/trips (POST)', () => {
    return request(app.getHttpServer())
      .post('/trips')
      .send({
        userId: 100, // ID of the user who performed a trip
        tripStart: '2022-09-08T11:37:00:000Z', // ISO 8601 string
        tripEnd: '2022-09-08T12:40:00:000Z', // ISO 8601 string
        distance: 85.7, // Distance in kilometers
      })
      .expect(200);
  });

  it('/users/:userId/trips (GET)', () => {
    return request(app.getHttpServer()).get('/users/:userId/trips').expect(200);
  });
});
