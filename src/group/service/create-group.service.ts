import { Injectable } from "@nestjs/common";
import { ResourceAlreadyCreateError } from "src/pipes/errors/resource-already-create.error";
import { ResourceNotFoundError } from "src/pipes/errors/resource-not-found.error";
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

        if(!findPlayerById) throw new ResourceNotFoundError("Jogador não encontrado")

        const findGroupByName = await this.groupRepository.findGroupByNameAndPlayer(
            data.name,
            data.playerId
        )

        if(findGroupByName) throw new ResourceAlreadyCreateError("Grupo já criado com esse nome")

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