import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtService } from './debt.service';
import { DebtController } from './debt.controller';
import { Debt } from '../entities/debt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Debt])],
  providers: [DebtService],
  controllers: [DebtController],
})
export class DebtModule {}

