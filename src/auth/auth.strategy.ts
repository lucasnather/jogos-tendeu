import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvType } from "src/env";
import { z } from "zod";

const payloadSchema = z.object({
    sub: z.string().uuid(),
    role: z.enum(['ADMIN', 'USER'])
})

export type PayloadType = z.infer<typeof payloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(private configService: ConfigService<EnvType, true>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('SECRET_KEY')
        }) 
    }

    async validate(payload: PayloadType) {
        return {
            sub: payload.sub,
            role: payload.role
        }
    }
}