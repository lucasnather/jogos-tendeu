import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Games } from "src/entity/games.entity";
import { Groups } from "src/entity/group.entity";
import { GroupRepository } from "src/group/repository/group.repository";
import { CreateGamesController } from "./controller/create-games.controller";
import { GamesRepository } from "./repository/games.repository";
import { CreateGamesService } from "./service/create-games.service";

@Module({
    controllers: [CreateGamesController],
    providers: [GamesRepository, CreateGamesService, GroupRepository],
    imports: [
        TypeOrmModule.forFeature([Games, Groups])
    ]
})
export class GamesModule {}