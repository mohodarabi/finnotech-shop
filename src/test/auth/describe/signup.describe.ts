import * as request from 'supertest';
import { app } from '../../test.e2e-spec';

let otpCode: string
let otpToken: string

describe('Signup (POST)', function () {


    // ========== FULLNAME =================

    it('should fail without a fullname', async function () {

        const response = await request(app.getHttpServer())
            .post('/api/v1/auth/signup')
            .send({
                email: 'mohodarabi@gmail.com',
                password: '123456',
            });

        expect(response.statusCode).toBe(422);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('missing or wrong credentials');
        expect(response.body.error.fullname).toBeDefined();


    });

    it('should fail with empty fullname', async function () {

        const response = await request(app.getHttpServer())
            .post('/api/v1/auth/signup')
            .send({
                fullname: '',
                email: 'mohodarabi@gmail.com',
                password: '123456',
            });

        expect(response.statusCode).toBe(422);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('missing or wrong credentials');
        expect(response.body.error.fullname).toBeDefined();

    });


    // ========== EMAIL =================

    it('should fail without email', async function () {

        const response = await request(app.getHttpServer())
            .post('/api/v1/auth/signup')
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
            .post('/api/v1/auth/signup')
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
            .post('/api/v1/auth/signup')
            .send({
                fullname: 'mohodarabi',
                email: 'mohodarabi@gmail.com'
            });

        expect(response.statusCode).toBe(422);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('missing or wrong credentials');
        expect(response.body.error.password).toBeDefined();

    });


    // ========== PASS =================

    it('should pass with correct data', async function () {

        const response = await request(app.getHttpServer())
            .post('/api/v1/auth/signup')
            .send({
                fullname: 'mohodarabi',
                email: 'mohodarabi@gmail.com',
                password: '123456'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('user successfully created');

        otpCode = response.body.data.otp;
        otpToken = response.body.data.otpToken

    });

});

export {
    otpCode,
    otpToken
}