import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


/**
 * This class is used to validating create products.
 * It specifies what data and with what features are required to get all products
 * And this class is used to swagger documentation
 */
export class CreateProductDto {

    @ApiProperty({})
    @IsNotEmpty({ message: "name must not be empty" })
    @IsString({ message: "name must be a string" })
    name: string;

    @ApiProperty({})
    @IsNotEmpty({ message: "description must not be empty" })
    @IsString({ message: "description must be a string" })
    description: string;

    @ApiProperty({})
    @IsNotEmpty({ message: "categoryName must not be empty" })
    @IsString({ message: "categoryName must be a string" })
    categoryName: string;

}

