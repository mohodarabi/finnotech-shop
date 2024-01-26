import { ApiProperty } from "@nestjs/swagger"

/**
 * The classes created below to display the response models in the Swagger documentation are in development mode
 */


export class CreateCategoryResponse {

    @ApiProperty({ example: 200 })
    status: number

    @ApiProperty({ example: true })
    success: boolean

    @ApiProperty({ example: 'category successfully created' })
    message: string

}

export class GetCategoriesResponse {

    @ApiProperty({ example: 200 })
    status: number

    @ApiProperty({ example: true })
    success: boolean

    @ApiProperty({ example: 'categories successfully taken' })
    message: string

    @ApiProperty({ example: ['phone', 'laptop', 'clothes'] })
    data: string

}