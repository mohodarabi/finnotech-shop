import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * This class is custom http exception 
 * when error is occurred we made a new instance of this class with constructor data
 */
export class CustomHttpException extends HttpException {
    constructor(statusCode: HttpStatus, message: string, error?: any) {
        super(
            {
                status: statusCode,
                success: false,
                message,
                error
            },
            statusCode,
        );
    }
}
