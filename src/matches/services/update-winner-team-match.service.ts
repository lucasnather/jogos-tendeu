import { Injectable } from "@nestjs/common";
import { Scores } from "src/entity/scores.entity";
import { GamesRepository } from "src/games/repository/games.repository";
import { ResourceNotFoundError } from "src/pipes/errors/resource-not-found.error";
import { PlayersRepository } from "src/players/repository/player.repository";
import { TeamMatchRepository } from "../repositories/team-match.repository";

type IndividualMatchRequest = {
    gameId: number,
    teamMatchId: number,
    winnerTeam: string[],
    playerId: string
}

@Injectable()
export class UpdateWinnerTeamMatchService {

    constructor(
        private readonly teamMatchRepository: TeamMatchRepository,
        private readonly gamesRepository: GamesRepository,
        private readonly playersRepository: PlayersRepository,
    ) {}

    async handle(data: IndividualMatchRequest) {
        const player = await this.playersRepository.findById(data.playerId)

        if(!player) throw new ResourceNotFoundError("Jogador não encontrado")

        const findGameById = await this.gamesRepository.findGameById(data.gameId)

        if(!findGameById) throw new ResourceNotFoundError("Jogo não encontrado")

        await this.teamMatchRepository.updateWinnerByIdAndGamesId(
            data.teamMatchId,
            data.gameId,
            data.winnerTeam,
        )

    }
}