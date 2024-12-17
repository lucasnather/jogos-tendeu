import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Players } from "src/entity/players.entity";
import { Repository } from "typeorm";

@Injectable()
export class PlayersRepository {

    constructor(
        @InjectRepository(Players)
        private readonly playersRepository: Repository<Players>
    ) {}

    async create(data: Players): Promise<Players> {
        const player = this.playersRepository.create(data)
        await this.playersRepository.save(player)

        return player
    }

    async findById(userId: string): Promise<Players> {
        const player = this.playersRepository.findOne({
            where: { id: userId },
            relations: ['sessions']
        })

        if(!player) return null

        return player
    }

    async findByNickname(nickname: string): Promise<Players> {
        const player = this.playersRepository.findOne({ where: { nickname } })

        if(!player) return null

        return player
    }
}