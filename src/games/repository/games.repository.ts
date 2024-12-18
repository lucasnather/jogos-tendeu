import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Games } from "src/entity/games.entity";
import { Groups } from "src/entity/group.entity";
import { Repository } from "typeorm";

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
}