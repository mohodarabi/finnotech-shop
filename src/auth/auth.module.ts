import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { EmailConfirmationModule } from 'src/email/email-confirmation.module';


@Module({

  imports: [
    UserModule,
    EmailConfirmationModule
  ],

  controllers: [
    AuthController
  ],

  providers: [
    AuthService
  ],

})

export class AuthModule { }