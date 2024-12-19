import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Groups } from "src/entity/group.entity";
import { Players } from "src/entity/players.entity";
import { PlayersRepository } from "src/players/repository/player.repository";
import { CreateGroupController } from "./controller/create-group.controller";
import { DeleteGroupController } from "./controller/delete-group.controller";
import { UpdateGroupController } from "./controller/update-group.controller";
import { GroupRepository } from "./repository/group.repository";
import { CreateGroupService } from "./service/create-group.service";
import { DeleteGroupService } from "./service/delete-group.service";
import { UpdateGroupService } from "./service/update-group.service";

@Module({
    controllers: [CreateGroupController, UpdateGroupController, DeleteGroupController],
    providers: [CreateGroupService, GroupRepository, PlayersRepository, UpdateGroupService, DeleteGroupService],
    imports: [
        TypeOrmModule.forFeature([Groups, Players])
    ],
    exports: []
})
export class GroupModule {}