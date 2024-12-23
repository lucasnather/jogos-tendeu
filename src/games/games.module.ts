import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Games } from "src/entity/games.entity";
import { Groups } from "src/entity/group.entity";
import { IndividualMatch } from "src/entity/individual-match.entity";
import { Players } from "src/entity/players.entity";
import { Scores } from "src/entity/scores.entity";
import { TeamMatch } from "src/entity/team-match.entity";
import { GroupRepository } from "src/group/repository/group.repository";
import { IndividualMatchRepository } from "src/matches/repositories/individual-match.repository";
import { TeamMatchRepository } from "src/matches/repositories/team-match.repository";
import { IndividualMatchService } from "src/matches/services/individual-match.service";
import { PlayersRepository } from "src/players/repository/player.repository";
import { CreateGamesController } from "./controller/create-games.controller";
import { FindGamesByFiltersController } from "./controller/find-games-filters.controller";
import { GamesRepository } from "./repository/games.repository";
import { CreateGamesService } from "./service/create-games.service";
import { FindGamesByFiltersService } from "./service/find-games-filters.service";

@Module({
    controllers: [CreateGamesController, FindGamesByFiltersController],
    providers: [
        GamesRepository, 
        TeamMatchRepository,
        PlayersRepository,
        GroupRepository, 
        IndividualMatchRepository, 
        TeamMatchRepository,
        CreateGamesService, 
        IndividualMatchService, 
        FindGamesByFiltersService
    ],
    imports: [
        TypeOrmModule.forFeature([Games, Groups, IndividualMatch, Scores, TeamMatch, Players])
    ]
})
export class GamesModule {}