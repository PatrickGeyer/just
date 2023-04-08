import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserTripsController {
  @Get(':id/trips')
  list() {
    return 'List of trips';
  }
}
