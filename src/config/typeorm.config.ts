import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: parseInt(configService.get<string>('DB_PORT')!, 5432),
  username: 'carmdj',
  password: '7879',
  database: 'liveshop',
  synchronize: false,
  entities: ['**/*.entity.ts'],
  migrations: ['src/migrations/*-migration.ts'],
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;
