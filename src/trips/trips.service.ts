import { Inject, Injectable } from '@nestjs/common';
import moment from 'moment';
import { retry } from 'ts-retry-promise';
import { NotificationsService } from '../notifications/notifications.service';
import { PolicyService } from '../policy/policy.service';
import { Trip } from './trips.entity';

export class IncomingTrip {
  userId: number; // ID of the user who performed a trip
  tripStart: Date; // ISO 8601 string
  tripEnd: Date; // ISO 8601 string
  distance: number; // Distance in kilometers
}

@Injectable()
export class TripsService {
  calculateCost(obj: IncomingTrip, pricePerMile: number) {
    return obj.distance * pricePerMile;
  }
  @Inject(PolicyService) policyService: PolicyService;
  @Inject(NotificationsService) notificationsService: NotificationsService;

  async create(obj: IncomingTrip) {
    // Calculate duration
    const duration = moment.duration(
      moment(obj.tripEnd).diff(moment(obj.tripStart)),
    );

    // Calculate cost
    console.debug(`Getting policy for user ${obj.userId}`);
    const { pricePerMile } = await retry(
      () => this.policyService.get(obj.userId),
      { retries: 3 },
    );
    console.debug(
      `Got price per mile for user ${obj.userId} of ${pricePerMile}`,
    );
    const cost = this.calculateCost(obj, pricePerMile);

    const trip = Trip.build({
      ...obj,
      duration: duration.toISOString(),
      cost,
    });

    console.debug(`Sending notification`);

    await retry(
      () =>
        this.notificationsService.create({
          title: 'Thanks for driving with Just 🚘',
          body: `You have driven for ${obj.distance} miles and it cost you $${
            trip.cost / 100
          }`,
        }),
      { retries: 3 },
    );

    return await trip.save();
  }
}
