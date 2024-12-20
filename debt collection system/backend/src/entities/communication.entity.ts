import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class Communication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // e.g., 'call', 'sms', 'email'

  @Column()
  message: string;

  @Column()
  status: string; // e.g., 'sent', 'delivered', 'failed'

  @Column()
  timestamp: Date;

  @ManyToOne(() => Customer, (customer) => customer.debts)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
