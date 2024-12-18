import { Body, Controller, HttpCode, Param, Post, Req, UseGuards, UsePipes } from "@nestjs/common";
import { Request } from "express";
import { PayloadType } from "src/auth/auth.strategy";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import { z } from "zod";
import { Type } from '../../entity/games.entity'
import { CreateGamesService } from "../service/create-games.service";

const createGamesBodySchema = z.object({
    name: z.string(),
    type: z.enum([Type.INDIVIDUAL, Type.TEAM])
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
    //@UsePipes(new ZodValidationPipe(createGamesParamSchema))
    //@UsePipes(new ZodValidationPipe(createGamesBodySchema))
    async create(
        @Body() body: CreateGamesBodyType, 
        @Param() param: CreateGamesParamType, 
        @Req() request: Request & { user: PayloadType }
    ){
        const { name, type} = createGamesBodySchema.parse(body)
        const { groupId  } = createGamesParamSchema.parse(param)
        const { sub  } = request.user

        const game = await this.createGamesService.handle({
            groupId,
            name,
            type,
            playerId: sub
        })

        return {
            data: {
                type: "Game",
                status: 201,
                game
            }
        }
    }
}