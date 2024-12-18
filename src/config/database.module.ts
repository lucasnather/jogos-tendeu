import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Games } from 'src/entity/games.entity'
import { Groups } from 'src/entity/group.entity'
import { IndividualMatch } from 'src/entity/individual-match.entity'
import { Players } from 'src/entity/players.entity'
import { Sessions } from 'src/entity/session.entity'
import { TeamMatch } from 'src/entity/team-match.entity'
import { EnvType } from 'src/env'

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
           imports: [ConfigModule],
           useFactory: (configService: ConfigService<EnvType, true>) => ({
            type: 'postgres',
            host: 'localhost',
            port: configService.get('POSTGRES_PORT'),
            username: configService.get('POSTGRES_USERNAME'),
            password: configService.get('POSTGRES_PASSWORD'),
            database: configService.get('POSTGRES_DATABASE'),
            entities: [Players, Sessions, Groups, Games, TeamMatch, IndividualMatch],
            synchronize: true
           }),
           inject: [ConfigService]
        }),
    ],
})
export class DatabaseModule {}