import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Communication } from '../entities/communication.entity';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class CommunicationService {
  private twilioClient = twilio('ACCOUNT_SID', 'AUTH_TOKEN');

  constructor(
    @InjectRepository(Communication)
    private communicationRepository: Repository<Communication>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async sendSMS(to: string, message: string): Promise<void> {
    const customer = await this.customerRepository.findOne({ where: { phone: to } });
    const communication = this.communicationRepository.create({
      type: 'SMS',
      message,
      status: 'sent',
      timestamp: new Date(),
      customer,
    });
    await this.communicationRepository.save(communication);

    await this.twilioClient.messages.create({
      body: message,
      from: 'YOUR_TWILIO_NUMBER',
      to: to,
    });
  }

  async makeCall(to: string, message: string): Promise<void> {
    const customer = await this.customerRepository.findOne({ where: { phone: to } });
    const communication = this.communicationRepository.create({
      type: 'Call',
      message,
      status: 'sent',
      timestamp: new Date(),
      customer,
    });
    await this.communicationRepository.save(communication);

    await this.twilioClient.calls.create({
      twiml: `<Response><Say>${message}</Say></Response>`,
      from: 'YOUR_TWILIO_NUMBER',
      to: to,
    });
  }
}

