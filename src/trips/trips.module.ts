import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { PolicyModule } from '../policy/policy.module';

@Module({
  imports: [NotificationsModule, PolicyModule],
  providers: [TripsService],
  controllers: [TripsController],
})
export class TripsModule {}
