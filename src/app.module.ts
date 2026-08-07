import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/reports.entity';
import cookieSession from 'cookie-session';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot({
    type: "better-sqlite3",
    database: process.env.NODE_ENV == 'test' ? 'test.sqlite' : 'db.sqlite',
    entities: [User, Report],
    synchronize: true
  }), UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true })
    },
  ],  
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(cookieSession({ keys: ['dsfsdfasfa']}))
    .forRoutes('*')
  }
}
