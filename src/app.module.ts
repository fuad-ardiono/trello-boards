import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const envData: any = dotenv.parse(fs.readFileSync('.env'));
console.log('env data', envData);

const DbConfig = TypeOrmModule.forRoot({
  type: envData.DB_TYPE,
  host: envData.DB_HOST,
  port: envData.DB_PORT,
  username: envData.DB_USER,
  password: envData.DB_PASS,
  database: envData.DB_NAME,
  entities: [],
  synchronize: true,
  logging: true,
  logger: 'advanced-console',
});

@Module({
  imports: [DbConfig, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
