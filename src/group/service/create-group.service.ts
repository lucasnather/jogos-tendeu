import { Injectable } from "@nestjs/common";
import { PlayersRepository } from "src/players/repository/player.repository";
import { GroupRepository } from "../repository/group.repository";

type CreateGroupRequest = {
    name: string
    playerId: string
}

@Injectable()
export class CreateGroupService {

    constructor(
        private readonly groupRepository: GroupRepository,
        private readonly playerRepository: PlayersRepository
    ) {}

    async handle(data: CreateGroupRequest) {
        const findPlayerById = await this.playerRepository.findById(data.playerId)

        if(!findPlayerById) throw new Error("Recurso não encontrado")

        const findGroupByName = await this.groupRepository.findGroupByNameAndPlayer(
            data.name,
            findPlayerById
        )

        if(findGroupByName) throw new Error("Grupo já criado")

        const group = await this.groupRepository.create({
            name: data.name,
            players: findPlayerById
        })

        await this.playerRepository.updatePlayerById(data.playerId)

        return {
            group
        }
    }
}