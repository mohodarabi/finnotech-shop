import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


/**
 * This class is used to validating create category data.
 * It specifies what data and with what features are required to creating category
 * And this class is used to swagger documentation
 */
export class CreateCategoryDto {

    @ApiProperty({})
    @IsNotEmpty({ message: "name must not be empty" })
    @IsString({ message: "name must be a string" })
    name: string;

    @ApiProperty({})
    @IsNotEmpty({ message: "description must not be empty" })
    @IsString({ message: "description must be a string" })
    description: string;

}

