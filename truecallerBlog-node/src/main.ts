import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  //To add api prefix
  app.setGlobalPrefix('api/v1');
  
  //To Enable Swagger url...
  const options = new DocumentBuilder()
    .setTitle('Truecaller Blog Api Endpoints')
    .setDescription('Truecaller Blog Api Endpoint Documentation.')
    .setVersion('1.0')
    .addTag('truecaller-blog')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger-ui-api', app, document);
  
  //To enable Cors.
  app.enableCors();

  await app.listen(configService.get('PORT'));
}
bootstrap();
