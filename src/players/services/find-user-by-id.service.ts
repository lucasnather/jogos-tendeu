import { Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "src/pipes/errors/resource-not-found.error";
import { PlayersRepository } from "../repository/player.repository";

@Injectable()
export class FindUserByIdService {

    constructor(
        private playerRepository: PlayersRepository
    ) {}

    async handle(playerId: string) {
        const player = await this.playerRepository.findById(playerId)

        if(!player) throw new ResourceNotFoundError("Jogador Não Econtrado")

        return {
            player
        }
    }
}