import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EnvType } from 'src/env'
import { Players } from 'src/players/players.entity'
import { Sessions } from 'src/players/session.entity'

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
           imports: [ConfigModule],
           useFactory: (configService: ConfigService<EnvType, true>) => ({
            type: 'postgres',
            host: 'localhost',
            port: configService.get('PORT'),
            POSTGRES_PORT: configService.get('POSTGRES_PORT'),
            POSTGRES_USERNAME: configService.get('POSTGRES_USERNAME'),
            POSTGRES_PASSWORD: configService.get('POSTGRES_PASSWORD'),
            POSTGRES_DATABASE: configService.get('POSTGRES_DATABASE'),
            entities: [
                Players, Sessions
            ],
            synchronize: true
           }),
           inject: [ConfigService]
        }),
    ],
})
export class DatabaseModule {}