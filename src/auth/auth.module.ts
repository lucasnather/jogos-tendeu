import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { EnvType } from 'src/env';
import { JwtStrategy } from './auth.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
    controllers: [],
    providers: [JwtStrategy, JwtAuthGuard],
    exports: [],
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService<EnvType, true>) => ({
                secretOrPrivateKey: configService.get('SECRET_KEY'),
                signOptions: { expiresIn: '5h' },
            })
        })
    ],
})
export class AuthModule {}