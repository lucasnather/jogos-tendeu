import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { EnvType } from "src/env";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import { z } from "zod";
import { AuthenticateUserService } from "../services/authenticate-user.service";

const authenticateBodySchema = z.object({
    nickname: z.string(),
    password: z.string()
})

type AuthenticateType = z.infer<typeof authenticateBodySchema>

@Controller("/api/authenticate")
export class AuthenticateController {

    constructor(
        private jwtService: JwtService,
        private authenticateUserService: AuthenticateUserService, 
        private configService: ConfigService<EnvType, true>
    ) {}

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(authenticateBodySchema))
    async authenticate(@Body() authenticateBody: AuthenticateUserService) {
        const { nickname, password } = authenticateBodySchema.parse(authenticateBody)

        const verifyPlayer = await this.authenticateUserService.handle(nickname, password)

        const payload = {
            sub: verifyPlayer.player.id,
            role: verifyPlayer.player.role
        }

        const accessToken = this.jwtService.sign(payload, { secret: this.configService.get('SECRET_KEY') })

        return {
            data: {
                type: "Token",
                status: 201,
                "access_token": accessToken,
            }
        }
    }
}