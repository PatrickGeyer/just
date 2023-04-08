import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TripsModule } from './trips/trips.module';
import { NotificationsService } from './notifications/notifications.service';
import { PolicyService } from './policy/policy.service';
import { NotificationsModule } from './notifications/notifications.module';
import { PolicyModule } from './policy/policy.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [TripsModule, NotificationsModule, PolicyModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, NotificationsService, PolicyService],
})
export class AppModule {}
