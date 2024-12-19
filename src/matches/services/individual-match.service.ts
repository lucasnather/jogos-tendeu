import { Injectable } from "@nestjs/common";
import { GamesRepository } from "src/games/repository/games.repository";
import { ResourceNotFoundError } from "src/pipes/errors/resource-not-found.error";
import { IndividualMatchRepository } from "../repositories/individual-match.repository";

type IndividualMatchRequest = {
    players: string[],
    gameId: number
}

@Injectable()
export class IndividualMatchService {

    constructor(
        private readonly individualMatchRepository: IndividualMatchRepository,
        private readonly gamesRepository: GamesRepository,
    ) {}

    async handle(data: IndividualMatchRequest) {
        const findGameById = await this.gamesRepository.findGameById(data.gameId)

        if(!findGameById) throw new ResourceNotFoundError("Jogo não encontrado")

        const individualMatch = await this.individualMatchRepository.create({
            players: data.players,
            games: {
                id: data.gameId,
                name: findGameById.name,
                type: findGameById.type
            }
        })

        return {
            individualMatch
        }
    }
}