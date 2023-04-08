import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NotificationsService {
  create(obj: NotificationBody) {
    return axios.post('https://eofhd4fui61rdfe.m.pipedream.net/push', obj, {
      headers: {
        User: 'you@email.com',
      },
    });
  }
}

class NotificationBody {
  title: string;
  body: string;
}
