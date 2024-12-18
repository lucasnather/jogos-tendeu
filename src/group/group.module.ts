import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Groups } from "src/entity/group.entity";
import { Players } from "src/entity/players.entity";
import { PlayersRepository } from "src/players/repository/player.repository";
import { CreateGroupController } from "./controller/create-group.controller";
import { GroupRepository } from "./repository/group.repository";
import { CreateGroupService } from "./service/create-group.service";

@Module({
    controllers: [CreateGroupController],
    providers: [CreateGroupService, GroupRepository, PlayersRepository],
    imports: [
        TypeOrmModule.forFeature([Groups, Players])
    ],
    exports: []
})
export class GroupModule {}