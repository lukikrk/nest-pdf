import { PdfDto } from './pdf.dto';
import { Readable } from 'stream';

export const PDF_GENERATOR: string = 'PDF GENERATOR';

export interface PdfGenerator {
    generate(dto: PdfDto): Promise<Readable>;
}
