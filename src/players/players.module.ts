import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Players } from "src/entity/players.entity";
import { RegisterPlayerController } from "./controller/register-user.controller";
import { PlayersRepository } from "./repository/player.repository";
import { RegisterUserService } from "./services/register-user.service";
import { PasswordHash } from "./utils/password-hash.service";

@Module({
    controllers: [RegisterPlayerController],
    providers: [PlayersRepository, PasswordHash, RegisterUserService],
    imports: [TypeOrmModule.forFeature([Players])],
    exports: [],
    
})
export class PlayersModule {}