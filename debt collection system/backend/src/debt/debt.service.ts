import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Debt } from '../entities/debt.entity';

@Injectable()
export class DebtService {
  constructor(
    @InjectRepository(Debt)
    private readonly debtRepository: Repository<Debt>,
  ) {}

  createDebt(debtDto) {
    const newDebt = this.debtRepository.create(debtDto);
    return this.debtRepository.save(newDebt);
  }

  findAllDebts() {
    return this.debtRepository.find();
  }

  findDebtById(id: number) {
    return this.debtRepository.findOneBy({ id });
  }

  async updateDebt(id: number, updateDebtDto) {
    await this.debtRepository.update(id, updateDebtDto);
    return this.findDebtById(id);
  }

  async removeDebt(id: number) {
    const debt = await this.findDebtById(id);
    if (debt) {
      await this.debtRepository.remove(debt);
      return debt;
    }
    return null;
  }

  async linkDebtToCustomer(debtId: number, customerId: number) {
    const debt = await this.findDebtById(debtId);
    if (debt) {
      debt.customer = { id: customerId } as any;
      return this.debtRepository.save(debt);
    }
    return null;
  }
}

