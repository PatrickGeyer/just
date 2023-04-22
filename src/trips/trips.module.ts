import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { PolicyModule } from '../policy/policy.module';
import { UserTripsController } from './user-trips.controller';

@Module({
  imports: [NotificationsModule, PolicyModule],
  providers: [TripsService],
  controllers: [TripsController, UserTripsController],
})
export class TripsModule {}
