import { Body, Controller, HttpCode, Injectable, Param, Put, Req, UseGuards, UsePipes } from "@nestjs/common";
import { PayloadType } from "src/auth/auth.strategy";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ResourceNotFoundError } from "src/pipes/errors/resource-not-found.error";
import { z } from "zod";
import { UpdateWinnerTeamMatchService } from "../services/update-winner-team-match.service";

const updateWinnerBodySchema = z.object({
    winnerTeam: z.array(z.string())
})

const updateWinnerParamSchema = z.object({
    gameId: z.coerce.number(),
    teamMatchId: z.coerce.number()
})

type UpdateWinnerBodyType = z.infer<typeof updateWinnerBodySchema>
type UpdateWinnerParamType = z.infer<typeof updateWinnerParamSchema>

@Controller("/api/winner/:gameId/team/:teamMatchId")
export class UpdateWinnerTeamMatchController {

    constructor(
        private teamMatchWinnerService: UpdateWinnerTeamMatchService
    ) {}

    @Put()
    @HttpCode(203)
    @UseGuards(JwtAuthGuard)
    //@UsePipes(new ZodValidationPipe(updateWinnerParamSchema))
    //@UsePipes(new ZodValidationPipe(updateWinnerBodySchema))
    async update(
        @Body() body: UpdateWinnerBodyType,
        @Param() param: UpdateWinnerParamType,
        @Req() request: Request & { user: PayloadType }
    ) {
        try {
            
            const { sub } = request.user
            const { winnerTeam} = updateWinnerBodySchema.parse(body)
            const { gameId, teamMatchId } = updateWinnerParamSchema.parse(param)
    
            await this.teamMatchWinnerService.handle({
                gameId,
                teamMatchId,
                playerId: sub,
                winnerTeam,
            })
    
            return {
                data: {
                    type: "Team Match",
                    status: 203,
                    winnerTeam,
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