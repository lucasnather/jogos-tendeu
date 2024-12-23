import { Injectable } from "@nestjs/common";
import { Type } from "src/entity/games.entity";
import { ResourceNotFoundError } from "src/pipes/errors/resource-not-found.error";
import { PlayersRepository } from "src/players/repository/player.repository";
import { GamesRepository } from "../repository/games.repository";

type FindGamesByRequest = {
    date?: Date
    name?: string
    type?: Type,
    winner?: string
    winnerTeam?: string[]
    playerId: string
    groupId: number
}

@Injectable()
export class FindGamesByFiltersService {

    constructor(
        private readonly gamesRepositpry: GamesRepository,
        private readonly playerRepository: PlayersRepository
    ) {}

    async handle(data: FindGamesByRequest) {
        const players = await this.playerRepository.findById(data.playerId)

        if(!players) throw new ResourceNotFoundError("Jogador não encontrado")

        const games = await this.gamesRepositpry.findGamesByFilters({
            date: data.date,
            name: data.name,
            winner: data.winner,
            winnerTeam: data.winnerTeam,
            groupId: data.groupId,
            type: data.type
        })

        return {
            games
        }
    }
}