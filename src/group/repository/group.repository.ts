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

    async findGroupByNameAndPlayer(name: string, player: Players) {
        const group = this.groupRepository.findOneBy({
            name,
            players: player
        })

        if(!group) return null

        return group
    }
}