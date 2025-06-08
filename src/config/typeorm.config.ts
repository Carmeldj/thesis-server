import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  ssl: true,
  url: 'postgresql://carmdj:gO1Z1ZwQa8AFKIMI4NTd3CdK2QUUChHP@dpg-d12rtkemcj7s73fn1mbg-a.frankfurt-postgres.render.com/liveshop',
  // host: configService.get<string>('DB_HOST'),
  port: 5432,
  // port: parseInt(configService.get<string>('DB_PORT')!, 5432),
  // username: 'carmdj',
  // password: '7879',
  // database: 'liveshop',
  synchronize: false,
  entities: ['**/*.entity.ts'],
  migrations: ['src/migrations/*-migration.ts'],
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;
