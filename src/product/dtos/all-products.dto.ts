import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * This class is used to validating getting all products.
 * It specifies what data and with what features are required to get all products
 * And this class is used to swagger documentation
 */
export class AllProductsDto {


    @ApiProperty({ example: 1, required: false })
    @IsString()
    @IsOptional()
    page: number;

    @ApiProperty({ example: 5, required: false })
    @IsString()
    @IsOptional()
    limit: number;

    @ApiProperty({
        description:
            `
            must be one of the "createdAt_asc", "createdAt_desc"
            `,
        type: String,
        enum: ['createdAt_asc', 'createdAt_desc'],
        required: false
    })
    @IsString()
    @IsOptional()
    sort: string;

}