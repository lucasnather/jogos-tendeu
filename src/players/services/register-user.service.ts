import { Injectable } from "@nestjs/common";
import { Players } from "src/entity/players.entity";
import { PlayersRepository } from "../repository/player.repository";
import { PasswordHash } from "../utils/password-hash.service";

@Injectable()
export class RegisterUserService {

    constructor(
        private readonly playersRepository: PlayersRepository,
        private readonly passwordHash: PasswordHash
    ) {}

    
    async handle(data: Players) {
        const findPlayerByNickname = await this.playersRepository.findByNickname(data.nickname)

        if(findPlayerByNickname) throw new Error('Jogador já existe')

        const player = await this.playersRepository.create(data)
        player.password = await this.passwordHash.hash(data.password)

        return player
    }
}