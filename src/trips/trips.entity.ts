import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  indexes: [
    {
      name: 'unique_index',
      unique: true,
      fields: ['userId', 'tripStart'],
    },
  ],
})
export class Trip extends Model {
  @Column
  userId: number;

  @Column
  tripStart: Date; // ISO 8601 string

  @Column
  tripEnd: Date; // ISO 8601 string

  @Column
  duration: string; // ISO 8601 duration (time the trip took)

  @Column
  distance: number; // Distance in kilometers

  @Column
  cost: number; // cost in cents
}
