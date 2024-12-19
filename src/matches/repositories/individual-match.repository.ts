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

    async updateWinnerByIdAndGamesId(individualMatchId: number, gamesId: number, winner: string) {
        const individualMatch = await this.individualMatchRepository.update({
            id: individualMatchId,
            games: { id: gamesId }
        }, { winner })

        if(individualMatch.affected === 0 ) return null
    }
}