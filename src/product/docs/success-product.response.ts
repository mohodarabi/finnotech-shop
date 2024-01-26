import { ApiProperty } from "@nestjs/swagger"

/**
 * The classes created below to display the response models in the Swagger documentation are in development mode
 */

export class CreateProductResponse {

    @ApiProperty({ example: 200 })
    status: number

    @ApiProperty({ example: true })
    success: boolean

    @ApiProperty({ example: 'product successfully created' })
    message: string

}


export class GetProductResponse {

    @ApiProperty({ example: 200 })
    status: number

    @ApiProperty({ example: true })
    success: boolean

    @ApiProperty({ example: 'products successfully taken' })
    message: string

    @ApiProperty({
        example: {
            docs: [
                {
                    _id: "65b283dacf98ea36e4ffced1",
                    name: "Samsung Galaxy M51",
                    categoryName: "phone",
                    description: "samsung galaxy m51",
                    createdAt: "2024-01-25T15:52:58.438Z"
                },
                {
                    _id: "65b28471cf98ea36e4ffced6",
                    name: "Samsung Galaxy A14",
                    categoryName: "phone",
                    description: "samsung galaxy m51",
                    createdAt: "2024-01-25T15:55:29.018Z"
                },
                {
                    _id: "65b28481cf98ea36e4ffcedb",
                    name: "Xiaomi Redmi Note 12",
                    categoryName: "phone",
                    description: "samsung galaxy m51",
                    createdAt: "2024-01-25T15:55:45.532Z"
                },
                {
                    _id: "65b2848ccf98ea36e4ffcee0",
                    name: "Nokia 106",
                    categoryName: "phone",
                    description: "samsung galaxy m51",
                    createdAt: "2024-01-25T15:55:56.580Z"
                },
                {
                    _id: "65b28498cf98ea36e4ffcee5",
                    name: "Apple iPhone 13",
                    categoryName: "phone",
                    description: "samsung galaxy m51",
                    createdAt: "2024-01-25T15:56:08.394Z"
                }
            ],
            totalDocs: 5,
            limit: 5,
            page: 1,
            totalPages: 1,
            pagingCounter: 1,
            hasPrevPage: false,
            hasNextPage: false,
            prevPage: null,
            nextPage: null
        }
    })
    data: Object

}