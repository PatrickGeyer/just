import { Controller, Get, Inject, Param } from '@nestjs/common';
import { TripsService } from './trips.service';
import { Trip } from './trips.entity';

@Controller('users')
export class UserTripsController {
  @Get(':id/trips')
  list(@Param('id') id: number) {
    return Trip.findAll({
      where: {
        userId: id,
      },
    });
  }
}
