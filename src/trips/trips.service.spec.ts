import { Test, TestingModule } from '@nestjs/testing';
import { AxiosError } from 'axios';
import moment from 'moment';
import { AppModule } from '../app.module';
import { TripsService } from './trips.service';

describe('TripsService', () => {
  let service: TripsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<TripsService>(TripsService);
  });

  it('should calculate duration correctly', async () => {
    const trip = await service.create({
      userId: 100, // ID of the user who performed a trip
      tripStart: '2022-09-08T11:40:00.000Z', // ISO 8601 string
      tripEnd: '2022-09-08T12:40:00.000Z', // ISO 8601 string
      distance: 85.7, // Distance in kilometers
    } as any);

    expect(JSON.stringify(trip.duration)).toEqual(
      JSON.stringify(moment.duration(1, 'hour')),
    );
  }, 50000);

  it('should calculate cost correctly', async () => {
    const cost = service.calculateCost(
      {
        userId: 100, // ID of the user who performed a trip
        tripStart: '2022-09-08T11:40:00.000Z', // ISO 8601 string
        tripEnd: '2022-09-08T12:40:00.000Z', // ISO 8601 string
        distance: 85.7, // Distance in kilometers
      } as any,
      17,
    );
    expect(cost).toBe(17 * 85.7);
  }, 50000);

  it('should trigger notification', async () => {
    const mock = jest
      .spyOn(service.notificationsService, 'create')
      .mockImplementationOnce(async (obj) => {
        return obj as any;
      });
    const trip = await service.create({
      userId: 100, // ID of the user who performed a trip
      tripStart: '2022-09-08T11:40:00.000Z', // ISO 8601 string
      tripEnd: '2022-09-08T12:40:00.000Z', // ISO 8601 string
      distance: 85.7, // Distance in kilometers
    } as any);

    expect(mock.mock.calls.length).toBe(1);
    expect(mock.mock.calls[0][0]).toMatchObject({
      title: 'Thanks for driving with Just 🚘',
      body: `You have driven for ${trip.distance} miles and it cost you $${
        trip.cost / 100
      }`,
    });
  }, 50000);

  it('should retry if policy cannot be fetched', async () => {
    const mock = jest
      .spyOn(service.policyService, 'get')
      .mockImplementationOnce(async (userId) => {
        throw AxiosError;
      });
    const trip = await service.create({
      userId: 100, // ID of the user who performed a trip
      tripStart: '2022-09-08T11:40:00.000Z', // ISO 8601 string
      tripEnd: '2022-09-08T12:40:00.000Z', // ISO 8601 string
      distance: 85.7, // Distance in kilometers
    } as any);

    expect(mock.mock.calls.length).toBe(2);
  }, 50000);
});
