import { Injectable } from "@nestjs/common";
import { CredentialInvalidError } from "src/pipes/errors/credential-invalid.error";
import { PlayersRepository } from "../repository/player.repository";
import { SessionRepository } from "../repository/session.repository";
import { PasswordHash } from "../utils/password-hash.service";

type AuthenticateRequest = {
    nickname: string
    password: string
    ip: string
    userAgent: string
}

@Injectable()
export class AuthenticateUserService {

    constructor(
        private readonly playersRepository: PlayersRepository,
        private readonly sessionsRepository: SessionRepository,
        private readonly passwordHash: PasswordHash
    ) {}

    async handle(data: AuthenticateRequest) {
        const findByNickname = await this.playersRepository.findByNickname(data.nickname)

        if(!findByNickname) throw new CredentialInvalidError()

        const isPasswordEqual = await this.passwordHash.compare(data.password, findByNickname.password)

        if(!isPasswordEqual) throw new CredentialInvalidError()

        await this.sessionsRepository.deleteByActive(findByNickname.id)

        const session = await this.sessionsRepository.create({
            ip: data.ip,
            userAgent: data.userAgent,
            player: findByNickname
        })

        return {
            player: findByNickname,
            session: session
        }
    }
}