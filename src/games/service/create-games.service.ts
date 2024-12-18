import { Injectable } from "@nestjs/common";
import { Type } from "src/entity/games.entity";
import { GroupRepository } from "src/group/repository/group.repository";
import { GamesRepository } from "../repository/games.repository";

type CreateGamesRequest = {
    name: string
    type: Type
    groupId: number
    playerId: string
}

@Injectable()
export class CreateGamesService {

    constructor(
        private readonly gamesRepository: GamesRepository,
        private readonly groupRepository: GroupRepository
    ) {}

    async handle(data: CreateGamesRequest) {
        const findGroupById = await this.groupRepository.findGroupById(data.groupId)

        if(!findGroupById) throw new Error("Recurso não encontrado")

        const findGameByName = await this.gamesRepository.findGameByNameAndPlayer(
            data.name,
            findGroupById.id
        )
        
        if(findGameByName) throw new Error("Jogo já foi criado")

        const game = await this.gamesRepository.create({
            name: data.name,
            type: data.type,
            group: {
                id: findGroupById.id,
                name: findGroupById.name
            }
        })

        return {
            game
        }
    }
}