import { PdfMockGenerator } from './pdf.mock-generator';
import { createReadStream } from 'fs';
import * as process from 'node:process';
import { join } from 'path';
import { Readable } from 'stream';

describe('PdfMockGenerator', (): void => {
    let pdfMockGenerator: PdfMockGenerator;

    beforeEach((): void => {
        pdfMockGenerator = new PdfMockGenerator();
    });

    it('should return sample pdf file', async (): Promise<void> => {
        const pdf: Readable = createReadStream(
            join(process.cwd(), 'resources/files/sample.pdf'),
        );
        let expected: string = '';
        let result: string = '';

        pdf.on('data', (data: string): void => {
            expected += data;
        });

        (await pdfMockGenerator.generate()).on('data', (data: string): void => {
            result += data;
        });

        expect(expected).toStrictEqual(result);
    });
});
