import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


/**
 * This class is used to validating signup users data.
 * It specifies what data and with what features are required to create a user
 * And this class is used to swagger documentation
 */
export class SignupUserDto {

  @ApiProperty({})
  @IsNotEmpty({ message: "fullname must not be empty" })
  @IsString({ message: "fullname must be a string" })
  fullname: string;

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

