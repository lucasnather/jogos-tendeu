import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Groups } from "src/entity/group.entity";
import { Players } from "src/entity/players.entity";
import { Repository } from "typeorm";

@Injectable()
export class GroupRepository {

    constructor(
        @InjectRepository(Groups)
        private readonly groupRepository: Repository<Groups>
    ) {}

    async create(data: Groups) {
        const group = this.groupRepository.create({
            name: data.name,
            players: data.players
        })
        await this.groupRepository.save(group)

        return group
    }

    async findGroupByNameAndPlayer(name: string, playerId: string) {
        const group = await this.groupRepository.findOneBy({
            name,
            players: {
                id: playerId
            }
        })

        if(!group) return null

        return group
    }

    async findGroupById(groupId: number) {
        const group = await this.groupRepository.findOneBy({
            id: groupId
        })

        if(!group) return null

        return group
    }
}