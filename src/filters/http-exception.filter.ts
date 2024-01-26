import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { CustomHttpException } from './custom-http.exception';

/**
 * This is global catch that whenever CustomHttpException occur,
 * this catch call and send response to user
 */
@Catch(CustomHttpException)
export class CustomExceptionFilter implements ExceptionFilter {

    /**
     * It specifies the events inside the catch
     */
    catch(exception: CustomHttpException, host: ArgumentsHost) {

        /**
         * change host to http request and puts in ctx
         */
        const ctx = host.switchToHttp();

        /**
         * from ctx extract the Response object and puts in response
         */
        const response = ctx.getResponse<Response>();

        /**
         * getting data from CustomHttpException and 
         * that data contains statusCode, message, success and error data which is optional 
         */
        const data: any = exception.getResponse()

        /**
         * sending CustomHttpException data as response to user  
         */
        response.status(data.status).json(exception.getResponse());
    }
}
