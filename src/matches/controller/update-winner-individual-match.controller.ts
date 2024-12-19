import { Body, Controller, HttpCode, Injectable, Param, Put, Req, UseGuards, UsePipes } from "@nestjs/common";
import { PayloadType } from "src/auth/auth.strategy";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import { z } from "zod";
import { UpdateWinnerIndividualMatchService } from "../services/update-winner-individual-match.service";

const updateWinnerBodySchema = z.object({
    winner: z.string(),
    scores: z.array(z.object({
        player: z.string().min(2, "Digite o nome do jogador"),
        score: z.number().positive("Digite o valor da pontuação")
    }))
})

const updateWinnerParamSchema = z.object({
    gameId: z.coerce.number(),
    individualMatchId: z.coerce.number()
})

type UpdateWinnerBodyType = z.infer<typeof updateWinnerBodySchema>
type UpdateWinnerParamType = z.infer<typeof updateWinnerParamSchema>

@Controller("/api/winner/:gameId/individual/:individualMatchId")
export class UpdateWinnerIndividualMatchController {

    constructor(
        private individualMatchWinnerService: UpdateWinnerIndividualMatchService
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
        const { sub } = request.user
        const { scores, winner} = updateWinnerBodySchema.parse(body)
        const { gameId, individualMatchId } = updateWinnerParamSchema.parse(param)

        const score = scores.map(s => {
            return {
                player: s.player,
                score: s.score
            }
        })
        const { scores: allScores } = await this.individualMatchWinnerService.handle({
            gameId,
            individualMatchId,
            playerId: sub,
            winner,
            scores: score
        })

        return {
            data: {
                type: "IndividualMatch",
                status: 203,
                winner,
                scores: allScores
            }
        }
    }
}