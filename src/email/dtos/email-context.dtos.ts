import { IsString, IsNotEmpty } from 'class-validator';

/**
 * This class is used to validating email context data.
 * It specifies what data and with what features are required to sending email
 * And this class is used to swagger documentation
 */
export class EmailContext {

    @IsNotEmpty({ message: "code must be a string" })
    @IsString({ message: "code must be a string" })
    code: string;

}