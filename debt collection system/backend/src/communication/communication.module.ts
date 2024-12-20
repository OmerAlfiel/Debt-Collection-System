import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationService } from './communication.service';
import { CommunicationController } from './communication.controller';
import { Communication } from '../entities/communication.entity';
import { Customer } from 'src/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Communication, Customer])],
  providers: [CommunicationService],
  controllers: [CommunicationController],
})
export class CommunicationModule {}

