import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Players } from "src/entity/players.entity";
import { Sessions } from "src/entity/session.entity";
import { AuthenticateController } from "./controller/authenticate.controller";
import { DeleteUserController } from "./controller/delete-user.controller";
import { FindUserByIdController } from "./controller/find-user-by-id.controller";
import { LogoutController } from "./controller/logout.controller";
import { RegisterPlayerController } from "./controller/register-player.controller";
import { UpdatePlayerController } from "./controller/update-user.controller";
import { PlayersRepository } from "./repository/player.repository";
import { SessionRepository } from "./repository/session.repository";
import { AuthenticateUserService } from "./services/authenticate-user.service";
import { DeleteUserService } from "./services/delete-user.service";
import { FindUserByIdService } from "./services/find-user-by-id.service";
import { LogoutService } from "./services/logout.service";
import { RegisterUserService } from "./services/register-user.service";
import { UpdatePlayerService } from "./services/update-player.service";
import { PasswordHash } from "./utils/password-hash.service";

@Module({
    controllers: [
        RegisterPlayerController,
        DeleteUserController ,  
        AuthenticateController, 
        FindUserByIdController, 
        LogoutController,
        UpdatePlayerController
    ],
    providers: [
        PlayersRepository, 
        PasswordHash, 
        RegisterUserService, 
        JwtService, 
        AuthenticateUserService,
        SessionRepository,
        FindUserByIdService,
        LogoutService,
        DeleteUserService,
        UpdatePlayerService
    ],
    imports: [TypeOrmModule.forFeature([Players, Sessions])],
    exports: [],
    
})
export class PlayersModule {}