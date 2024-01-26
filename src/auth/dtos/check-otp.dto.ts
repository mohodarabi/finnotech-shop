import { IsNotEmpty, Length, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * This class is used to validating users otp code data.
 * It specifies what data and with what features are required to checking opt  
 * And this class is used to swagger documentation
 */
export class CheckOtpDto {

    @ApiProperty({})
    @IsNotEmpty({ message: "code must be a string" })
    @Length(4, 4, { message: "code must be 4 digits" })
    @IsString({ message: "code must be a string" })
    code: string;

}
