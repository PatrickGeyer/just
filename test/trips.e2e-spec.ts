import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

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
        tripStart: '2022-09-08T11:40:00.000Z', // ISO 8601 string
        tripEnd: '2022-09-09T11:40:00.000Z', // ISO 8601 string
        distance: 85.7, // Distance in kilometers
      })
      .expect(201);
  }, 20000);

  it('should fail multiple /trips (POST)', async () => {
    await request(app.getHttpServer()).post('/trips').send({
      userId: 100, // ID of the user who performed a trip
      tripStart: '2022-09-08T11:40:00.000Z', // ISO 8601 string
      tripEnd: '2022-09-09T11:40:00.000Z', // ISO 8601 string
      distance: 85.7, // Distance in kilometers
    });
    await request(app.getHttpServer())
      .post('/trips')
      .send({
        userId: 100, // ID of the user who performed a trip
        tripStart: '2022-09-08T11:40:00.000Z', // ISO 8601 string
        tripEnd: '2022-09-09T11:40:00.000Z', // ISO 8601 string
        distance: 85.7, // Distance in kilometers
      })
      .expect(500);
  }, 20000);

  it('/users/:userId/trips (GET)', async () => {
    await request(app.getHttpServer())
      .post('/trips')
      .send({
        userId: 1, // ID of the user who performed a trip
        tripStart: '2022-09-08T11:40:00.000Z', // ISO 8601 string
        tripEnd: '2022-09-09T11:40:00.000Z', // ISO 8601 string
        distance: 85.7, // Distance in kilometers
      })
      .expect(201);
    await request(app.getHttpServer())
      .post('/trips')
      .send({
        userId: 1, // ID of the user who performed a trip
        tripStart: '2022-09-08T11:40:00.000Z', // ISO 8601 string
        tripEnd: '2022-09-09T11:40:00.000Z', // ISO 8601 string
        distance: 5.7, // Distance in kilometers
      })
      .expect(201);

    expect(
      (await request(app.getHttpServer()).get('/users/1/trips')).body.length,
    ).toBe(2);
    expect(
      (await request(app.getHttpServer()).get('/users/2/trips')).body.length,
    ).toBe(0);
  }, 20000);
});
