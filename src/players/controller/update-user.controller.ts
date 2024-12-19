import { Body, Controller, HttpCode, Post, Put, Req, UseGuards, UsePipes } from "@nestjs/common";
import { Request } from "express";
import { PayloadType } from "src/auth/auth.strategy";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ResourceNotFoundError } from "src/pipes/errors/resource-not-found.error";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import { z } from "zod";
import { UpdatePlayerService } from "../services/update-player.service";

export const updatePlayerSchema = z.object({
    name: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    nickname: z.string().optional().nullable(),
})

type UpdatePlayerType = z.infer<typeof updatePlayerSchema>

@Controller('/api/players')
export class UpdatePlayerController {

    constructor(
        private updatePlayerService: UpdatePlayerService
    ) {}

    @Put()
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ZodValidationPipe(updatePlayerSchema))
    async create(@Body() updatePlayerDTO: UpdatePlayerType, @Req() request: Request & { user: PayloadType }) {
        try {
            const {  name, nickname, password } = updatePlayerSchema.parse(updatePlayerDTO)
            const { sub } = request.user

            await this.updatePlayerService.handle({
                name,
                nickname,
                password,
                playerId: sub
            })

            return {
                data: {
                    type: "Player",
                    status: 200,
                    message: "Dados do jogador atualizado"
                }
            }
        } catch (e) {
            if(e instanceof ResourceNotFoundError) {
                return {
                    message: "Error",
                    status: 404,
                    error: e.message
                }
            }
        }
    }
}

