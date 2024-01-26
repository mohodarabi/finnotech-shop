import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { EmailContext } from './dtos/email-context.dtos'
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailConfirmationService {

    constructor(
        private readonly configService: ConfigService,
        private readonly mailerService: MailerService
    ) { }

    public sendCode(email: string, context: EmailContext, subject: string) {

        return this.mailerService.sendMail({
            from: {
                name: 'FinnotechShop',
                address: this.configService.get<string>('EMAIL_ADDRESS'),
            },
            to: email,
            subject,
            template: join(__dirname, '..', '..', 'email-template', 'otp.ejs'),
            context,
        });

    }
}