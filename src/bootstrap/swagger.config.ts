import { DocumentBuilder } from "@nestjs/swagger";

/**
 * configure swagger
 */
export const swaggerConfig = new DocumentBuilder()
    .setTitle('shop')
    .setVersion('1.0')
    .setDescription(`This is a test project for Finnotech company`)
    .build();

