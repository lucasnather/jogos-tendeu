import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IndividualMatch } from "src/entity/individual-match.entity";
import { Scores } from "src/entity/scores.entity";
import { Repository } from "typeorm";

@Injectable()
export class IndividualMatchRepository {
    
    constructor(
        @InjectRepository(IndividualMatch)
        private individualMatchRepository: Repository<IndividualMatch>,
        @InjectRepository(Scores)
        private scoresRepository: Repository<Scores>
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
        }, {
            winner: winner,
        })

        if(individualMatch.affected === 0 ) return null
    }

    async createScores(scores: Scores[] ) {
        const score = this.scoresRepository.create(scores)
        await this.scoresRepository.save(score)

        return score
    }
}