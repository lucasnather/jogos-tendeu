import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './config/database.module';
import { envSchema } from './env';
import { GamesModule } from './games/games.module';
import { GroupModule } from './group/group.module';
import { MatchesModule } from './matches/matches.module';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validate: (env) => envSchema.parse(env),
      isGlobal: true
    }),
    PlayersModule, DatabaseModule, AuthModule, GroupModule, GamesModule, MatchesModule
  ],
})
export class AppModule {}
