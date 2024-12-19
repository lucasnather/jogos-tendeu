import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IndividualMatch } from "src/entity/individual-match.entity";
import { Repository } from "typeorm";

@Injectable()
export class IndividualMatchRepository {
    
    constructor(
        @InjectRepository(IndividualMatch)
        private individualMatchRepository: Repository<IndividualMatch>
    ) {}

    async create(data: IndividualMatch): Promise<IndividualMatch> {
        const individualMatch = this.individualMatchRepository.create({
            players: data.players,
            games: {
                id: data.games.id
            }
        })

        await this.individualMatchRepository.save(individualMatch)

        return individualMatch
    }
}