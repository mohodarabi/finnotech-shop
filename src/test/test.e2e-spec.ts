import beforeAndAfterHooks from './test.app';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { UserRepository } from 'src/user/user.repository';
import * as cookieParser from 'cookie-parser';
import { httpValidationPipe } from 'src/bootstrap/http-validation.pipe';


let app: INestApplication;
let userRepository: UserRepository

/**
 * RoleManagementController E2E tests 
 */
describe('Finnotech Tests (e2e)', () => {


    /**
     * initialize app for start this is undefined
     */
    beforeAll(async () => {

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        app.use(cookieParser(process.env.COOKIE_SECRET));

        app.useGlobalPipes(httpValidationPipe);

        await app.init();
    });

    /** 
     * initialize tests before and after hooks 
    */
    beforeAndAfterHooks()


    /**
     * Auth Tests
     */
    require('./auth/auth.e2e')

})

export {
    app,
    userRepository,
}; 