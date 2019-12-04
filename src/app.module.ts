import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { BoardModule } from './board/board.module';
import { Board } from './board/board.entity';
import { BoardController } from './board/board.controller';
import { BoardService } from './board/board.service';
import { RedisModule } from 'nestjs-redis';
import { BoardGateway } from './board/board.gateway';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const envData: any = dotenv.parse(fs.readFileSync('.env'));

const DbConfig = TypeOrmModule.forRoot({
  type: envData.DB_TYPE,
  host: envData.DB_HOST,
  port: envData.DB_PORT,
  username: envData.DB_USER,
  password: envData.DB_PASS,
  database: envData.DB_NAME,
  entities: [User, Board],
  synchronize: true,
  logging: true,
  logger: 'advanced-console',
});

const redisOptions = {
  host: envData.REDIS_HOST,
  port: envData.REDIS_PORT,
  db: Number(envData.REDIS_DB),
  password: envData.REDIS_PASS,
  keyPrefix: '',
};

@Module({
  imports: [DbConfig, RedisModule.register(redisOptions), UserModule, BoardModule],
  controllers: [AppController, UserController, BoardController],
  providers: [AppService, UserService, BoardService, BoardGateway],
})
export class AppModule {}
