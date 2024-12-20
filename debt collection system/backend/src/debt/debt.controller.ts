import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DebtService } from './debt.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';


@Controller('debt')
export class DebtController {
  constructor(private readonly debtService: DebtService) {}

  @Post()
  createDebt(@Body() debtDto: CreateDebtDto) {
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
  updateDebt(@Param('id') id: number, @Body() updateDebtDto: UpdateDebtDto) {
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

