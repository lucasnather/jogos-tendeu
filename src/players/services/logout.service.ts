import { Injectable } from "@nestjs/common";
import { SessionRepository } from "../repository/session.repository";

type LogoutRequest = {
    playerId: string
}

@Injectable()
export class LogoutService {

    constructor(
        private readonly sessionsRepository: SessionRepository
    ) {}

    async handle(data: LogoutRequest) {
       await this.sessionsRepository.logoutUser(data.playerId)
    }
}