import {
    Body,
    Controller,
    Inject,
    Post,
    Res,
    StreamableFile,
} from '@nestjs/common';
import { PdfDto } from './pdf.dto';
import { PDF_GENERATOR, PdfGenerator } from './pdf.generator';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
    constructor(
        @Inject(PDF_GENERATOR) private readonly pdfGenerator: PdfGenerator,
    ) {}

    @Post()
    async generate(
        @Body() dto: PdfDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<StreamableFile> {
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition':
                'attachment; filename="' + dto.name + '.pdf"',
        });

        return new StreamableFile(await this.pdfGenerator.generate(dto));
    }
}
