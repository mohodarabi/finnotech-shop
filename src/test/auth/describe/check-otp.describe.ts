import * as request from 'supertest';
import { app } from './../../test.e2e-spec';
import { generate2FASCode } from 'src/utils/functions';
import { otpCode, otpToken } from './signup.describe'


describe('Check-Otp (POST)', function () {

    // ================= UNAUTHORIZED =================

    it('should pass with proper data', async function () {

        const response = await request(app.getHttpServer())
            .post('/api/v1/auth/check-otp')
            .send()

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("unauthorized");
    });


    // ================= OTP =================

    it('should fail without otp', async function () {

        const response = await request(app.getHttpServer())
            .post('/api/v1/auth/check-otp')
            .send({})
            .set('authorization', otpToken);

        expect(response.statusCode).toBe(422);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('missing or wrong credentials');
        expect(response.body.error.code).toBeDefined();
    });

    it('should fail if the otp code was incorrect', async function () {

        const incorrectOtp = generate2FASCode(2)

        const response = await request(app.getHttpServer())
            .post('/api/v1/auth/check-otp')
            .send({
                code: incorrectOtp.code,
            })
            .set('authorization', otpToken);



        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('unauthorized')

    });

    it('should fail with invalid otp length', async function () {

        const response = await request(app.getHttpServer())
            .post('/api/v1/auth/check-otp')
            .send({
                code: "12345",
            })
            .set('authorization', otpToken);

        expect(response.statusCode).toBe(422);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('missing or wrong credentials')
        expect(response.body.error.code).toBeDefined();
    });


    // ================= PASS =================

    it('should pass with proper data', async function () {

        const response = await request(app.getHttpServer())
            .post('/api/v1/auth/check-otp')
            .send({
                code: otpCode,
            })
            .set('authorization', otpToken);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("code has been successfully verified");
    });


    // ================= UNAUTHORIZED =================

    it('should fail if use otp twice', async function () {

        const response = await request(app.getHttpServer())
            .post('/api/v1/auth/check-otp')
            .send({
                code: otpCode,
            })
            .set('authorization', otpToken);

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("unauthorized");
    });

});
