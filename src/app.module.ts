import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { LivestreamingModule } from './livestreaming/livestreaming.module';
import { LiveStream } from './livestreaming/entities/live-stream.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: process.env.DB_HOST,
      url: 'postgresql://carmdj:gO1Z1ZwQa8AFKIMI4NTd3CdK2QUUChHP@dpg-d12rtkemcj7s73fn1mbg-a.frankfurt-postgres.render.com/liveshop',
      ssl: true,
      port: parseInt(process.env.DB_PORT!),
      // password: process.env.DB_PASSWORD,
      // username: process.env.DB_USERNAME,
      // database: process.env.DB_NAME,
      logging: true,
      entities: [User, LiveStream],
    }),
    LivestreamingModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
