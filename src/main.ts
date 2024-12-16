import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'
import { EnvType } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<EnvType, true>)
  
  await app.listen(configService.get('PORT') ?? 8080);
}
bootstrap();
