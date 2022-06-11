import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
  });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('SoundCloud(Clone) Api example')
    .setDescription('SoundCloud API description')
    .setVersion('1.0')
    .addTag('soundcloud')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('/api/v1');
  await app.listen(4000);
}
bootstrap();
