import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Games } from "src/entity/games.entity";
import { IndividualMatch } from "src/entity/individual-match.entity";
import { Players } from "src/entity/players.entity";
import { Scores } from "src/entity/scores.entity";
import { GamesRepository } from "src/games/repository/games.repository";
import { PlayersRepository } from "src/players/repository/player.repository";
import { UpdateWinnerIndividualMatchController } from "./controller/update-winner-individual-match.controller";
import { IndividualMatchRepository } from "./repositories/individual-match.repository";
import { IndividualMatchService } from "./services/individual-match.service";
import { UpdateWinnerIndividualMatchService } from "./services/update-winner-individual-match.service";

@Module({
    controllers: [UpdateWinnerIndividualMatchController],
    providers: [IndividualMatchRepository, IndividualMatchService, GamesRepository, PlayersRepository, UpdateWinnerIndividualMatchService],
    imports: [
        TypeOrmModule.forFeature([Games, IndividualMatch, Players, Scores])
    ],
    exports: [IndividualMatchService]
})
export class MatchesModule {}