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
        this.playersRepository.save(player)

        return player
    }

    async findByNickname(nickname: string): Promise<Players> {
        const player = this.playersRepository.findOne({ where: { nickname } })

        if(!player) return null

        return player
    }
}