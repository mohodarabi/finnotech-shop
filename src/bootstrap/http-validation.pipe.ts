import { ValidationPipe, ValidationError, HttpStatus } from '@nestjs/common'
import { CustomHttpException } from 'src/filters/custom-http.exception';


export const httpValidationPipe = new ValidationPipe({
    exceptionFactory: (validationErrors: ValidationError[] = []) => {

        /**
         * constraints is a empty object to store each input validation error
         * at the end constraints send to front as error data
        */
        var constraints: { [k: string]: any } = {};

        /**
         * this loop made a object with input name key and errors object value
        */
        validationErrors.forEach(validationError => {
            if (validationError.children.length > 0) {
                validationError.children.forEach(item => {
                    constraints[`${item.property}`] = item.constraints
                })
            } else {
                constraints[`${validationError.property}`] = validationError.constraints
            }
        })

        /**
         * return new UnprocessableEntityException with 422 status code
         * and validation error data
        */
        return new CustomHttpException(HttpStatus.UNPROCESSABLE_ENTITY, "missing or wrong credentials", constraints);
    },
})