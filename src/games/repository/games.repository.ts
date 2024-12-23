import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Games, Type } from "src/entity/games.entity";
import { In, Like, Repository } from "typeorm";

type Filters = {
    groupId: number
    date?: Date
    type?: Type
    name?: string
    winner?: string
    winnerTeam?: string[]
}

@Injectable()
export class GamesRepository {

    constructor(
        @InjectRepository(Games)
        private readonly gamesRepository: Repository<Games>
    ) {}

    async create(data: Games) {
        const games = this.gamesRepository.create({
            name: data.name,
            type: data.type,
            group: {
                id: data.group.id
            }
        })
        await this.gamesRepository.save(games)

        return games
    }

    async findGamesByFilters(filters: Filters) {
        const currentlyDate = new Date(filters.date)

        const games = await this.gamesRepository.find({
            where: {
                ...( filters.groupId && { group: { id: filters.groupId } } ),
                ...(filters.name && { name: Like(`%${filters.name}%`) }),
                ...(filters.winner && { individualMatch: { winner: filters.winner  }}),
                ...(filters.winnerTeam && { teamMatch: { winnerTeam: In(filters.winnerTeam) }}),
                ...(filters.type && { type: filters.type  }),
                ...(filters.date && { createdAt: currentlyDate })
            },
            relations: ['individualMatch', 'teamMatch']
        })

        return games
    }

    async findGameByNameAndPlayer(name: string, groupId: number) {
        const games = this.gamesRepository.findOneBy({
            name,
            group: {
                id: groupId
            }
        })

        if(!games) return null

        return games
    }

    async findGameById(gameId: number) {
        const game = await this.gamesRepository.findOneBy({
            id: gameId
        })

        if(!game) return null

        return game
    }

    async updateRelationIndividualMatch(individualMatchId: number, gameId: number) {
        await this.gamesRepository.update({
            id: gameId
        }, { individualMatch: { id: individualMatchId } })

        
    }

    async updateRelationTeamMatch(teamMatchId: number, gameId: number) {
        await this.gamesRepository.update({
            id: gameId
        }, { teamMatch: { id: teamMatchId } })

        
    }
}