import { IsNotEmpty, IsUrl } from 'class-validator';

export class PdfDto {
    @IsNotEmpty()
    readonly name: string;

    @IsUrl()
    readonly url: string;
}
