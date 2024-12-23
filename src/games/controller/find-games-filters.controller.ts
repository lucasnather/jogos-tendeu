import { Controller, Get, HttpCode, Param, Query, Req, UseGuards } from "@nestjs/common";
import { PayloadType } from "src/auth/auth.strategy";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Type } from "src/entity/games.entity";
import { ResourceNotFoundError } from "src/pipes/errors/resource-not-found.error";
import { z } from "zod";
import { FindGamesByFiltersService } from "../service/find-games-filters.service";

const findGamesQuerySchema = z.object({
    date: z.date().optional().nullable(),
    name: z.string().optional().nullable(),
    winner: z.string().optional().nullable(),
    type: z.nativeEnum(Type).optional().nullable(),
    winnerTeam: z.array(z.string()).optional().nullable(),
})

const findGamesParamSchema = z.object({
    groupId: z.coerce.number()
})

type FindGamesFiltersQueryType = z.infer<typeof findGamesQuerySchema>
type FindGamesFiltersParamType = z.infer<typeof findGamesParamSchema>

@Controller("/api/games/:groupId")
export class FindGamesByFiltersController {
    
    constructor(
        private readonly findGamesFiltersService: FindGamesByFiltersService
    ) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async find(@Query() query: FindGamesFiltersQueryType, @Param() param: FindGamesFiltersParamType, @Req() request: Request & { user: PayloadType }) {
        try {
            const { date, name, winner, winnerTeam, type } = findGamesQuerySchema.parse(query)
            const { sub } = request.user
            const {  groupId } = findGamesParamSchema.parse(param)

            const { games  } = await this.findGamesFiltersService.handle({
                playerId: sub,
                groupId,
                date,
                name,
                winner,
                type,
                winnerTeam
            })

            console.log(games)

            return {
                data: {
                    type: "Games",
                    status: 200,
                    games
                }
            }
        }catch(e) {
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