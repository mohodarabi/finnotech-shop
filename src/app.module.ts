import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmailConfirmationModule } from './email/email-confirmation.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';


@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./config/.env.${process.env.NODE_ENV}`
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI, {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-paginate-v2'));
        connection.plugin(require('mongoose-aggregate-paginate-v2'));
        return connection;
      }
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          uri: config.get<string>('DATABASE_URI')
        }
      },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    EmailConfirmationModule,
    CategoryModule,
    ProductModule,
    UserModule
  ],


  controllers: [],


  providers: [],


})

export class AppModule { }
