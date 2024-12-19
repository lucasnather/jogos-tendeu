import { Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "src/pipes/errors/resource-not-found.error";
import { PlayersRepository } from "../repository/player.repository";
import { PasswordHash } from "../utils/password-hash.service";

type UpdateUserRequest = {
    nickname?: string
    password?: string
    name?: string
    playerId: string
}

@Injectable()
export class UpdatePlayerService {

    constructor(
        private playerRepository: PlayersRepository,
        private passwordHash: PasswordHash
    ) {}

    async handle(data: UpdateUserRequest) {
        let newPasswordHash: string |  null
        const player = await this.playerRepository.findById(data.playerId)

        if(!player) throw new ResourceNotFoundError("Jogador Não Econtrado")

        if(data.password) {
            newPasswordHash = await this.passwordHash.hash(data.password)
        }

        const newPlayer = await this.playerRepository.update(data.playerId, {
            name: data.name,
            nickname: data.nickname,
            password: newPasswordHash
        })

        return {
            player: newPlayer
        }
    }
}