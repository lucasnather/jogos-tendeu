import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Sessions } from "src/entity/session.entity";
import { Repository } from "typeorm";

@Injectable()
export class SessionRepository {

    constructor(
        @InjectRepository(Sessions)
        private readonly sessionRepository: Repository<Sessions>
    ) {}

    async create(data: Sessions): Promise<Sessions> {
        const session = this.sessionRepository.create({
            active: true,
            ip: data.ip,
            userAgent: data.userAgent,
            player: { id: data.player.id }
        })
        this.sessionRepository.save(session)

        return session
    }

    async deleteByActive(playerId: string) {
        const session = await this.sessionRepository.delete({
            active: true,
            player: {
                id: playerId
            }
        })

        if(session.affected === 0) return null
    }

    async logoutUser(playerId: string) {
        const session = await this.sessionRepository.update({
            player: {
                id: playerId
            }
        }, { active: false  })

        if(session.affected === 0) return null

    }
}