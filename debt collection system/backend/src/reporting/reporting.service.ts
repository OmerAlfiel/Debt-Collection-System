import { Injectable } from '@nestjs/common';
import * as pdf from 'pdf-lib';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../entities/report.entity';

@Injectable()
export class ReportingService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  async generateReport(data: { id: number, name: string, amount: number }[]): Promise<any> {
    // Logic to aggregate and transform data into a report
    const report = {
      title: 'Debt Collection Report',
      date: new Date(),
      data: data,
    };
    return report;
  }

  async formatReportAsJSON(report: any): Promise<string> {
    // Logic to format the report as JSON
    return JSON.stringify(report, null, 2);
  }

  async formatReportAsPDF(report: any): Promise<Buffer> {
    // Logic to format the report as PDF
    const pdfDoc = await pdf.PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText(`Title: ${report.title}`);
    page.drawText(`Date: ${report.date}`, { y: page.getHeight() - 20 });
    report.data.forEach((item, index) => {
      page.drawText(`ID: ${item.id}, Name: ${item.name}, Amount: ${item.amount}`, { y: page.getHeight() - 40 - (index * 20) });
    });
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }

  async saveReport(report: any): Promise<Report> {
    const newReport = this.reportRepository.create({
      name: report.title,
      data: JSON.stringify(report),
      generatedAt: new Date(),
    });
    return this.reportRepository.save(newReport);
  }

  async getSavedReports(): Promise<Report[]> {
    return this.reportRepository.find();
  }
}
