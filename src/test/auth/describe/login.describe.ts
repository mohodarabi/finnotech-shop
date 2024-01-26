import * as request from 'supertest';
import { app } from '../../test.e2e-spec';


describe('Login (POST)', function () {

    // ========== EMAIL =================

    it('should fail without email', async function () {

        const response = await request(app.getHttpServer())
            .post('/api/v1/auth/login')
            .send({
                fullname: 'mohodarabi',
                password: '123456',
            });

        expect(response.statusCode).toBe(422);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('missing or wrong credentials');
        expect(response.body.error.email).toBeDefined();

    });

    it('should fail with invalid email', async function () {

        const response = await request(app.getHttpServer())
            .post('/api/v1/auth/login')
            .send({
                fullname: 'mohodarabi',
                email: 'mohodarabi',
                password: '123456',
            });

        expect(response.statusCode).toBe(422);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('missing or wrong credentials');
        expect(response.body.error.email).toBeDefined();

    });


    // ========== PASSWORD =================

    it('should fail without password', async function () {

        const response = await request(app.getHttpServer())
            .post('/api/v1/auth/login')
            .send({
                fullname: 'mohodarabi',
                email: 'mohodarabi@gmail.com'
            });

        expect(response.statusCode).toBe(422);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('missing or wrong credentials');
        expect(response.body.error.password).toBeDefined();

    });


    // ========== INCORRECT_DATA =================

    it('should fail with incorrect email', async function () {

        const response = await request(app.getHttpServer())
            .post('/api/v1/auth/login')
            .send({
                email: 'mohodarabii@gmail.com',
                password: '123456'
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('user not found');

    });

    it('should fail with incorrect password', async function () {

        const response = await request(app.getHttpServer())
            .post('/api/v1/auth/login')
            .send({
                email: 'mohodarabi@gmail.com',
                password: '1234567'
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('user not found');

    });


    // ========== PASS =================

    it('should pass with correct data', async function () {

        const response = await request(app.getHttpServer())
            .post('/api/v1/auth/login')
            .send({
                email: 'mohodarabi@gmail.com',
                password: '123456'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('user successfully logged in');

    });

});
