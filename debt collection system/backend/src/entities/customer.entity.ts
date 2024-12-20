import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Debt } from './debt.entity';


@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column('text', { nullable: true })
  address: string;

  @OneToMany(() => Debt, (debt) => debt.customer)
  debts: Debt[];
}
