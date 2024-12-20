import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { ReportingService } from './reporting.service';
import { Response } from 'express';

@Controller('reporting')
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Post('json')
  async getReportAsJSON(@Body() data: { id: number, name: string, amount: number }[], @Res() res: Response) {
    const report = await this.reportingService.generateReport(data);
    const jsonReport = await this.reportingService.formatReportAsJSON(report);
    res.json(jsonReport);
  }

  @Post('pdf')
  async getReportAsPDF(@Body() data: { id: number, name: string, amount: number }[], @Res() res: Response) {
    const report = await this.reportingService.generateReport(data);
    const pdfReport = await this.reportingService.formatReportAsPDF(report);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfReport);
  }

  @Post('save')
  async saveReport(@Body() data: { id: number, name: string, amount: number }[], @Res() res: Response) {
    const report = await this.reportingService.generateReport(data);
    const savedReport = await this.reportingService.saveReport(report);
    res.json(savedReport);
  }

  @Get('saved')
  async getSavedReports(@Res() res: Response) {
    const reports = await this.reportingService.getSavedReports();
    res.json(reports);
  }
}

