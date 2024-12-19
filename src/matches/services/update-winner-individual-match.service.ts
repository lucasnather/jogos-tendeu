import { Injectable } from "@nestjs/common";
import { Scores } from "src/entity/scores.entity";
import { GamesRepository } from "src/games/repository/games.repository";
import { ResourceNotFoundError } from "src/pipes/errors/resource-not-found.error";
import { PlayersRepository } from "src/players/repository/player.repository";
import { IndividualMatchRepository } from "../repositories/individual-match.repository";

type IndividualMatchRequest = {
    gameId: number,
    individualMatchId: number,
    winner: string,
    playerId: string,
    scores: Scores[]
}

@Injectable()
export class UpdateWinnerIndividualMatchService {

    constructor(
        private readonly individualMatchRepository: IndividualMatchRepository,
        private readonly gamesRepository: GamesRepository,
        private readonly playersRepository: PlayersRepository,
    ) {}

    async handle(data: IndividualMatchRequest) {
        const player = await this.playersRepository.findById(data.playerId)

        if(!player) throw new ResourceNotFoundError("Jogador não encontrado")

        const findGameById = await this.gamesRepository.findGameById(data.gameId)

        if(!findGameById) throw new ResourceNotFoundError("Jogo não encontrado")

        await this.individualMatchRepository.updateWinnerByIdAndGamesId(
            data.individualMatchId,
            data.gameId,
            data.winner,
        )

        const scores = await this.individualMatchRepository.createScores(data.scores)

        return {
            scores
        }
    }
}