import { Injectable } from "@nestjs/common";
import { PlayersRepository } from "../repository/player.repository";
import { PasswordHash } from "../utils/password-hash.service";

@Injectable()
export class AuthenticateUserService {

    constructor(
        private readonly playersRepository: PlayersRepository,
        private readonly passwordHash: PasswordHash
    ) {}

    async handle(nickname: string, password: string) {
        const findByNickname = await this.playersRepository.findByNickname(nickname)

        if(!findByNickname) throw new Error("Credenciais Inválidas")

        const isPasswordEqual = await this.passwordHash.compare(password, findByNickname.password)

        if(!isPasswordEqual) throw new Error("Credenciais Inválidas")
        console.log(isPasswordEqual)

        return {
            player: findByNickname
        }
    }
}