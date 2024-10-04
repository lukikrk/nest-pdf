import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { PdfModule } from '../src/pdf/pdf.module';

describe('PdfController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [PdfModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('/pdf (GET) (404)', () => {
        return request(app.getHttpServer()).get('/pdf').expect(404);
    });

    it('/pdf (POST) (201)', () => {
        const body: object = {
            name: 'name',
            url: 'http://test.net',
        };

        return request(app.getHttpServer())
            .post('/pdf')
            .send(body)
            .expect('Content-Type', 'application/pdf')
            .expect('Content-Disposition', 'attachment; filename="name.pdf"')
            .expect(201);
    });

    it('/pdf (POST) (400) (empty url)', () => {
        const body: object = {
            name: 'name',
        };

        return request(app.getHttpServer())
            .post('/pdf')
            .send(body)
            .expect(400)
            .expect({
                message: ['url must be a URL address'],
                error: 'Bad Request',
                statusCode: 400,
            });
    });

    it('/pdf (POST) (400) (invalid url)', () => {
        const body: object = {
            name: 'name',
            url: 'asd',
        };

        return request(app.getHttpServer())
            .post('/pdf')
            .send(body)
            .expect(400)
            .expect({
                message: ['url must be a URL address'],
                error: 'Bad Request',
                statusCode: 400,
            });
    });

    it('/pdf (POST) (400) (empty url)', () => {
        const body: object = {
            url: 'http://test.net',
        };

        return request(app.getHttpServer())
            .post('/pdf')
            .send(body)
            .expect(400)
            .expect({
                message: ['name should not be empty'],
                error: 'Bad Request',
                statusCode: 400,
            });
    });
});
