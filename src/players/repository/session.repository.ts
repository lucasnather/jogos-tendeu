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

    async findByActive(userId: string) {
        const findByActive = await this.sessionRepository.findOneBy({
            active: true,
            player: {
                id: userId
            }
        })

        if(!findByActive) return null

        return findByActive
    }
}