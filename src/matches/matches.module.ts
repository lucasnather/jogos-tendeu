import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Games } from "src/entity/games.entity";
import { IndividualMatch } from "src/entity/individual-match.entity";
import { GamesRepository } from "src/games/repository/games.repository";
import { IndividualMatchRepository } from "./repositories/individual-match.repository";
import { IndividualMatchService } from "./services/individual-match.service";

@Module({
    controllers: [],
    providers: [IndividualMatchRepository, IndividualMatchService, GamesRepository],
    imports: [
        TypeOrmModule.forFeature([Games, IndividualMatch])
    ],
    exports: [IndividualMatchService]
})
export class MatchesModule {}