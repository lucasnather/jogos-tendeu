import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validate: (env) => envSchema.parse(env),
      isGlobal: true
    })
  ],
})
export class AppModule {}
