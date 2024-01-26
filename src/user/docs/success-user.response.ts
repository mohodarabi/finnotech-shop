import { ApiProperty } from "@nestjs/swagger"

/**
 * The classes created below to display the response models in the Swagger documentation are in development mode
 */

export class UserInformationResponse {

    @ApiProperty({ example: 200 })
    status: number

    @ApiProperty({ example: true })
    success: boolean

    @ApiProperty({ example: 'user information successfully taken' })
    message: string

    @ApiProperty({
        example: {
            fullname: "mohodarabi",
            email: "mohodarabi@gmail.com",
        }
    })
    data: Object

}

