import Buffer from 'node:buffer';
import puppeteer, { Browser, Page } from 'puppeteer';
import { Readable } from 'stream';
import { PdfDto } from './pdf.dto';
import { PdfGenerator } from './pdf.generator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfPuppeteerGenerator implements PdfGenerator {
    async generate(dto: PdfDto): Promise<Readable> {
        const browser: Browser = await puppeteer.launch({
            executablePath: '/usr/bin/chromium',
            args: ['--no-sandbox'],
        });

        const page: Page = await browser.newPage();

        await page.goto(dto.url, { waitUntil: 'networkidle0' });

        const pdf: Buffer = await page.pdf();

        await browser.close();

        return Readable.from(pdf);
    }
}
