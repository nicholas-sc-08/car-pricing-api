import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  // aqui eu crio o repo automaticamente listando um array do tipo user da entity
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService,
    //aqio eu to declarando que o user interceptor vai ser pra todas os controllers do user, globalizando ele, ao inves de ter que ficar declarando em varios lugares diferentes
    {
      provide: APP_INTERCEPTOR, 
      useClass: CurrentUserInterceptor
    }
  ]
})
export class UsersModule { }
