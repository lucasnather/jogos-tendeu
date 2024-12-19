import { Injectable } from "@nestjs/common";
import { ResourceAlreadyCreateError } from "src/pipes/errors/resource-already-create.error";
import { ResourceNotFoundError } from "src/pipes/errors/resource-not-found.error";
import { PlayersRepository } from "src/players/repository/player.repository";
import { GroupRepository } from "../repository/group.repository";

type DeleteGroupRequest = {
    playerId: string
    groupId: number
}

@Injectable()
export class DeleteGroupService {

    constructor(
        private readonly groupRepository: GroupRepository,
        private readonly playerRepository: PlayersRepository
    ) {}

    async handle(data: DeleteGroupRequest) {
        const findPlayerById = await this.playerRepository.findById(data.playerId)

        if(!findPlayerById) throw new ResourceNotFoundError("Jogador não encontrado")

        const findGroupByName = await this.groupRepository.findGroupById(data.groupId)

        if(!findGroupByName) throw new ResourceNotFoundError("Grupo não encontrado")

        await this.groupRepository.deleteGroup(data.groupId, data.playerId)

    }
}