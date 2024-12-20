import { Controller, Post, Body } from '@nestjs/common';
import { CommunicationService } from './communication.service';

@Controller('communication')
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @Post('send-sms')
  async sendSMS(@Body('to') to: string, @Body('message') message: string): Promise<void> {
    await this.communicationService.sendSMS(to, message);
  }

  @Post('make-call')
  async makeCall(@Body('to') to: string, @Body('message') message: string): Promise<void> {
    await this.communicationService.makeCall(to, message);
  }
}

