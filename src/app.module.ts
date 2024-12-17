import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './config/database.module';
import { envSchema } from './env';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validate: (env) => envSchema.parse(env),
      isGlobal: true
    }),
    PlayersModule, DatabaseModule, AuthModule
  ],
})
export class AppModule {}
