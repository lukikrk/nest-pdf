import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfPuppeteerGenerator } from './pdf.puppeteer-generator';
import { PDF_GENERATOR } from './pdf.generator';
import { PdfMockGenerator } from './pdf.mock-generator';
import * as process from 'node:process';

@Module({
    controllers: [PdfController],
    providers: [
        {
            provide: PDF_GENERATOR,
            useClass:
                'test' === process.env.NODE_ENV
                    ? PdfMockGenerator
                    : PdfPuppeteerGenerator,
        },
    ],
})
export class PdfModule {}
