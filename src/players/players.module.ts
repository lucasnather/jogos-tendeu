import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Players } from "src/entity/players.entity";
import { AuthenticateController } from "./controller/authenticate.controller";
import { RegisterPlayerController } from "./controller/register-user.controller";
import { PlayersRepository } from "./repository/player.repository";
import { AuthenticateUserService } from "./services/authenticate-user.service";
import { RegisterUserService } from "./services/register-user.service";
import { PasswordHash } from "./utils/password-hash.service";

@Module({
    controllers: [RegisterPlayerController, AuthenticateController],
    providers: [PlayersRepository, PasswordHash, RegisterUserService, JwtService, AuthenticateUserService],
    imports: [TypeOrmModule.forFeature([Players])],
    exports: [],
    
})
export class PlayersModule {}