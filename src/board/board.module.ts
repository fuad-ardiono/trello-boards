import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardGateway } from './board.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  providers: [BoardService, BoardGateway],
  controllers: [BoardController],
  exports: [TypeOrmModule],
})
export class BoardModule {}
