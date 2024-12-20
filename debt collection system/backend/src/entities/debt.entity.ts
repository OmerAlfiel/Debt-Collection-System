import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class Debt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  dueDate: Date;

  @Column({ default: 'pending' })
  status: string; // e.g., 'pending', 'paid', 'overdue'

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Customer, (customer) => customer.debts)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
