import { PdfGenerator } from './pdf.generator';
import { Readable } from 'stream';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as process from 'node:process';

export class PdfMockGenerator implements PdfGenerator {
    async generate(): Promise<Readable> {
        return createReadStream(
            join(process.cwd(), 'resources/files/sample.pdf'),
        );
    }
}
