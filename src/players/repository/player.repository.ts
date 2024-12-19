import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Players, Role } from "src/entity/players.entity";
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

    async updatePlayerById(playerId: string) {
        const result = await this.playersRepository.update(playerId, {
            role: Role.ADMIN
        })

        if(result.affected === 0) return null
    }

    async update(playerId: string, data: Players ) {
        const result = await this.playersRepository.update(playerId, {
            nickname: data.nickname,
            password: data.password,
            name: data.name
        })

        if(result.affected === 0) return null
    }

    async deleteById(playerId: string) {
        const result = await this.playersRepository.delete({
            id: playerId
        })

        if(result.affected === 0) return null
    }
}