import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'
import { EnvType } from './env';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<EnvType, true>)
  app.useGlobalPipes(new ValidationPipe())
  
  await app.listen(configService.get('PORT') ?? 8080);
}
bootstrap();
