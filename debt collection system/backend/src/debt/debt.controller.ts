import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DebtService } from './debt.service';

@Controller('debt')
export class DebtController {
  constructor(private readonly debtService: DebtService) {}

  @Post()
  createDebt(@Body() debtDto) {
    return this.debtService.createDebt(debtDto);
  }

  @Get()
  findAllDebts() {
    return this.debtService.findAllDebts();
  }

  @Get(':id')
  findDebtById(@Param('id') id: number) {
    return this.debtService.findDebtById(id);
  }

  @Put(':id')
  updateDebt(@Param('id') id: number, @Body() updateDebtDto) {
    return this.debtService.updateDebt(id, updateDebtDto);
  }

  @Delete(':id')
  removeDebt(@Param('id') id: number) {
    return this.debtService.removeDebt(id);
  }

  @Put(':debtId/link/:customerId')
  linkDebtToCustomer(@Param('debtId') debtId: number, @Param('customerId') customerId: number) {
    return this.debtService.linkDebtToCustomer(debtId, customerId);
  }
}

