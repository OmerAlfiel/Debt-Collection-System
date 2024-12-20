import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { DebtModule } from './debt/debt.module';
import { CommunicationModule } from './communication/communication.module';
import { ReportingModule } from './reporting/reporting.module';

import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, CustomerModule, DebtModule, CommunicationModule, ReportingModule,  DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
