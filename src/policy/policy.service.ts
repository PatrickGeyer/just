import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PolicyService {
  get(userId: number): Promise<PolicyResponse> {
    return axios
      .get(
        `https://eojkwncdbn9jr88.m.pipedream.net/users/${userId}/policy/price`,
        {
          headers: {
            User: 'you@email.com',
          },
        },
      )
      .then((x) => x.data);
  }
}

class PolicyResponse {
  pricePerMile: number;
}
