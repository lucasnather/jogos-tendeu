import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Scores } from "src/entity/scores.entity";
import { TeamMatch } from "src/entity/team-match.entity";
import { Repository } from "typeorm";

@Injectable()
export class TeamMatchRepository {

    constructor(
        @InjectRepository(TeamMatch)
        private teamMatchRepository: Repository<TeamMatch>,
        @InjectRepository(Scores)
        private scoresRepository: Repository<Scores>,
    ) {}

    async create(data: TeamMatch): Promise<TeamMatch> {
        const teamMatch = this.teamMatchRepository.create({
            purpleTeam: data.purpleTeam,
            yellowTeam: data.yellowTeam,
            games: {
                id: data.games.id
            }
        })
        
        await this.teamMatchRepository.save(teamMatch)

        return teamMatch
    }

    async updateWinnerByIdAndGamesId(teamMatchId: number, gamesId: number, winnerTeam: string[]) {
        const teamMatch = await this.teamMatchRepository.update({
            id: teamMatchId,
            games: { id: gamesId }
        }, {
            winnerTeam,
        })

        if(teamMatch.affected === 0 ) return null
    }

    async createScores(scores: Scores[] ) {
        const score = this.scoresRepository.create(scores)
        await this.scoresRepository.save(score)

        return score
    }
}