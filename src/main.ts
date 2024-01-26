import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as mongoSanitize from 'express-mongo-sanitize';
import { httpValidationPipe } from 'src/bootstrap/http-validation.pipe';
import { swaggerConfig } from 'src/bootstrap/swagger.config';
const xss = require('xss-clean');


async function bootstrap() {

  /**
   * Create a NestJS application with Express and enable CORS
   */
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  /**
   * Generate Swagger documentation for the API
   */
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  if (process.env.NODE_ENV === 'development') {
    SwaggerModule.setup('/api-doc', app, document, {
      customSiteTitle: "shop-doc",
    });
  }

  /**
   * Set up middleware for handling cookies, security headers, and sanitization
   */
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
  }));
  app.use(xss());
  app.use(mongoSanitize());

  /**
    * This is a global configuration for validation fields. 
    * When validation is failed, this configuration generates error 422.
    * 
    * validationErrors is an array that contains all errors occurred during validation
  */
  app.useGlobalPipes(httpValidationPipe);

  /**
   * Start listening on port 3000
  */
  const PORT = process.env.APP_PORT || 3000;

  await app.listen(PORT);

}

bootstrap();
