import { ApiProperty } from '@nestjs/swagger';

/**
 * This class represents BadRequests error for swagger doc
 */
export class BadRequestError {

    @ApiProperty({ example: 400 })
    status: number

    @ApiProperty({ example: false })
    success: boolean

    @ApiProperty({ example: "bad request" })
    message: string

}

/**
 * This class represents ValidationError error for swagger doc
 */
export class UnprocessableEntityError {

    @ApiProperty({ example: 422 })
    status: number

    @ApiProperty({ example: false })
    success: boolean

    @ApiProperty({ example: "missing or wrong credentials" })
    message: string

    @ApiProperty({
        example: {
            email: {
                isNotEmpty: "email should not be empty",
            },
            password: {
                minLength: "password must be longer than or equal to 5 characters",
            }
        }
    })
    data: {
        inputName: {
            cause: "this is why error occurred"
        }
    }

}

/**
 * This class represents InternalServerError error for swagger doc
 */
export class InternalServerError {

    @ApiProperty({ example: 500 })
    status: number

    @ApiProperty({ example: false })
    success: boolean

    @ApiProperty({ example: "something went wrong" })
    message: string

}

/**
 * This class represents UnAuthorizedError error for swagger doc
 */
export class UnAuthorizedError {

    @ApiProperty({ example: 401 })
    status: number

    @ApiProperty({ example: false })
    success: boolean

    @ApiProperty({ example: "unauthorized" })
    message: string

}

/**
 * This class represents ForbiddenError error for swagger doc
 */
export class ForbiddenError {

    @ApiProperty({ example: 403 })
    status: number

    @ApiProperty({ example: false })
    success: boolean

    @ApiProperty({ example: "forbidden" })
    message: string

}

/**
 * This class represents DuplicateError for swagger doc
 */
export class DuplicateError {

    @ApiProperty({ example: 409 })
    status: number

    @ApiProperty({ example: false })
    success: boolean

    @ApiProperty({ example: "something already exist" })
    message: string

}

/**
 * This class represents NotFoundError for swagger doc
 */
export class NotFoundError {

    @ApiProperty({ example: 404 })
    status: number

    @ApiProperty({ example: false })
    success: boolean

    @ApiProperty({ example: "something not found" })
    message: string

}

/**
 * This class represents NotFoundError for swagger doc
 */
export class ExpiredError {

    @ApiProperty({ example: 410 })
    status: number

    @ApiProperty({ example: false })
    success: boolean

    @ApiProperty({ example: "something is expired" })
    message: string

}
