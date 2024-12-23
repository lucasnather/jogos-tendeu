import { Injectable } from "@nestjs/common";
import { Games, Type } from "src/entity/games.entity";
import { IndividualMatch } from "src/entity/individual-match.entity";
import { TeamMatch } from "src/entity/team-match.entity";
import { GroupRepository } from "src/group/repository/group.repository";
import { IndividualMatchRepository } from "src/matches/repositories/individual-match.repository";
import { TeamMatchRepository } from "src/matches/repositories/team-match.repository";
import { ResourceAlreadyCreateError } from "src/pipes/errors/resource-already-create.error";
import { ResourceNotFoundError } from "src/pipes/errors/resource-not-found.error";
import { GamesRepository } from "../repository/games.repository";

type CreateGamesRequest = {
    name: string
    type: Type
    groupId: number
    playerId: string,
    individualPlayers?: string[]
    purpleTeam?: string[]
    yellowTeam?: string[]
}

@Injectable()
export class CreateGamesService {

    constructor(
        private readonly gamesRepository: GamesRepository,
        private readonly groupRepository: GroupRepository,
        private readonly individualMatchRepository: IndividualMatchRepository,
        private readonly teamMatchRepository: TeamMatchRepository,
    ) {}

    async handle(data: CreateGamesRequest) {
        let individualMatch: IndividualMatch
        let teamMatch: TeamMatch
        let games: Games
        const findGroupById = await this.groupRepository.findGroupById(data.groupId)

        if(!findGroupById) throw new ResourceNotFoundError("Grupo não encontrado")

        const findGameByName = await this.gamesRepository.findGameByNameAndPlayer(
            data.name,
            findGroupById.id
        )
        
        if(findGameByName) throw new ResourceAlreadyCreateError("Jogo já foi criado com esse nome")


        if(data.type === 'team') {
            games = await this.gamesRepository.create({
                name: data.name,
                type: data.type,
                group: {
                    id: findGroupById.id,
                    name: findGroupById.name
                }
            })

            teamMatch = await this.teamMatchRepository.create({
                purpleTeam: data.purpleTeam,
                yellowTeam: data.yellowTeam,
                games: {
                    id: games.id,
                    type: games.type,
                    name: games.name
                }
            })

            return {
                games,
                players: teamMatch
            }
        }

        if(data.type === 'individual') {
            games = await this.gamesRepository.create({
                name: data.name,
                type: data.type,
                group: {
                    id: findGroupById.id,
                    name: findGroupById.name
                }
            })

            individualMatch = await this.individualMatchRepository.create({
                players: data.individualPlayers,
                games: {
                    id: games.id,
                    type: games.type,
                    name: games.name
                }
            })
            return {
                games,
                players: individualMatch
            }
        } 
  
    }
}