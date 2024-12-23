import { Body, Controller, HttpCode, Param, Post, Req, UseGuards, UsePipes } from "@nestjs/common";
import { Request } from "express";
import { PayloadType } from "src/auth/auth.strategy";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ResourceAlreadyCreateError } from "src/pipes/errors/resource-already-create.error";
import { ResourceNotFoundError } from "src/pipes/errors/resource-not-found.error";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import { z } from "zod";
import { Type } from '../../entity/games.entity'
import { CreateGamesService } from "../service/create-games.service";

const createGamesBodySchema = z.object({
    name: z.string(),
    type: z.enum([Type.INDIVIDUAL, Type.TEAM]),
    players: z.array(z.string()).optional().nullable(),
    purpleTeam: z.array(z.string()).optional().nullable(),
    yellowTeam: z.array(z.string()).optional().nullable()
})

const createGamesParamSchema = z.object({
    groupId: z.coerce.number()
})

type CreateGamesBodyType = z.infer<typeof createGamesBodySchema>
type CreateGamesParamType = z.infer<typeof createGamesParamSchema>

@Controller("/api/games/:groupId")
export class CreateGamesController {

    constructor(
        private createGamesService: CreateGamesService
    ) {}

    @Post()
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    async create(
        @Body() body: CreateGamesBodyType, 
        @Param() param: CreateGamesParamType, 
        @Req() request: Request & { user: PayloadType }
    ){
        try {
            const { name, type, players, purpleTeam, yellowTeam} = createGamesBodySchema.parse(body)
            const { groupId  } = createGamesParamSchema.parse(param)
            const { sub  } = request.user

            const { games, players: allPlayers } = await this.createGamesService.handle({
                groupId,
                name,
                type,
                purpleTeam,
                yellowTeam,
                playerId: sub,
                individualPlayers: players
            })


            return {
                data: {
                    type: "Game",
                    status: 201,
                    games,
                    allPlayers
                }
            }
        } catch(e) {
            if(e instanceof ResourceAlreadyCreateError || e instanceof ResourceNotFoundError) {
                return {
                    message: "Error",
                    status: 404,
                    error: e.message
                }
            }
        }
    }
}