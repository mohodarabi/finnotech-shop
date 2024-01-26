import { ApiProperty } from '@nestjs/swagger';

/**
 * The classes created below to display the response models in the Swagger documentation are in development mode
 */

export class SignupUsersResponse {

    @ApiProperty({ example: 200 })
    status: number

    @ApiProperty({ example: true })
    success: boolean

    @ApiProperty({ example: 'user successfully created' })
    message: string

}

export class LoginUserResponse {

    @ApiProperty({ example: 200 })
    status: number

    @ApiProperty({ example: true })
    success: boolean

    @ApiProperty({ example: 'user successfully logged in' })
    message: string

}

export class CheckOtpResponse {

    @ApiProperty({ example: 200 })
    status: number

    @ApiProperty({ example: true })
    success: boolean

    @ApiProperty({ example: 'code has been successfully verified', })
    message: string

    @ApiProperty({ description: 'delete this filed on production', example: "1234" })
    otp: string

    @ApiProperty({ description: 'user registered status', example: true })
    isNew: boolean

}