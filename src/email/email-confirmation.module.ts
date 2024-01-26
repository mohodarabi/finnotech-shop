import { Module } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({

    imports: [
        ConfigModule,
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({

                transport: {
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: configService.get<string>('EMAIL_USER'),
                        pass: configService.get<string>('EMAIL_PASS'),
                    },
                },

                defaults: {
                    from: {
                        name: 'Fancy',
                        address: configService.get<string>('EMAIL_ADDRESS'),
                    }
                },

                template: {
                    dir: join(__dirname, '..', '..', 'email-template'),
                    adapter: new EjsAdapter(),
                    options: {
                        strict: true,
                    },
                },

            }),
            inject: [ConfigService],
        }),
    ],

    controllers: [],

    providers: [
        EmailConfirmationService
    ],

    exports: [
        EmailConfirmationService
    ],

})

export class EmailConfirmationModule { }