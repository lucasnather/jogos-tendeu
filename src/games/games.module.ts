import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Games } from "src/entity/games.entity";
import { Groups } from "src/entity/group.entity";
import { IndividualMatch } from "src/entity/individual-match.entity";
import { Scores } from "src/entity/scores.entity";
import { TeamMatch } from "src/entity/team-match.entity";
import { GroupRepository } from "src/group/repository/group.repository";
import { IndividualMatchRepository } from "src/matches/repositories/individual-match.repository";
import { TeamMatchRepository } from "src/matches/repositories/team-match.repository";
import { IndividualMatchService } from "src/matches/services/individual-match.service";
import { CreateGamesController } from "./controller/create-games.controller";
import { GamesRepository } from "./repository/games.repository";
import { CreateGamesService } from "./service/create-games.service";

@Module({
    controllers: [CreateGamesController],
    providers: [
        GamesRepository, 
        TeamMatchRepository,
        GroupRepository, 
        IndividualMatchRepository, 
        TeamMatchRepository,
        CreateGamesService, 
        IndividualMatchService, 
    ],
    imports: [
        TypeOrmModule.forFeature([Games, Groups, IndividualMatch, Scores, TeamMatch])
    ]
})
export class GamesModule {}