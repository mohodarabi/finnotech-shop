import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


/**
 * This class is used to validating login users data.
 * It specifies what data and with what features are required to user can login.
 * And this class is used to swagger documentation
 */
export class LoginUserDto {

  @ApiProperty({})
  @IsEmail({}, { message: "invalid email" })
  @IsNotEmpty({ message: "email must not be empty" })
  @IsString({ message: "email must be a string" })
  email: string;

  @ApiProperty({})
  @IsNotEmpty({ message: "password must not be empty" })
  @IsString({ message: "password must be a string" })
  password: string;

}

