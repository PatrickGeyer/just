import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { IncomingTrip, TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  @Inject(TripsService) service: TripsService;

  @Post()
  create(@Body() trip: IncomingTrip) {
    return this.service.create(trip);
  }
}
