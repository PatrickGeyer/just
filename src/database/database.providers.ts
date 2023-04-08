import { Sequelize } from 'sequelize-typescript';
import { Trip } from '../trips/trips.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        database: 'just',
      });
      sequelize.addModels([Trip]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
