import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import { z } from "zod";
import { RegisterUserService } from "../services/register-user.service";

export const createPlayerSchema = z.object({
    name: z.string().min(3, "Nome precisa ter no mínimo 3 caracteres"),
    password: z.string().min(8, "Senha precisa ter no mínimo 8 caracteres"),
    nickname: z.string().min(3, "Nickname precisa ter no mínimo 3 caracteres"),
})

type CreatePlayerType = z.infer<typeof createPlayerSchema>

@Controller('/api/players')
export class RegisterPlayerController {

    constructor(
        private registerPlayersService: RegisterUserService
    ) {}

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createPlayerSchema))
    async create(@Body() createPlayerDTO: CreatePlayerType) {
        const {  name, nickname, password } = createPlayerSchema.parse(createPlayerDTO)
        const createPlayer = {
            name,
            nickname,
            password
        }

        const player = await this.registerPlayersService.handle(createPlayer)

        return {
            data: {
                type: "Player",
                status: 201,
                field: player
            }
        }
    }
}