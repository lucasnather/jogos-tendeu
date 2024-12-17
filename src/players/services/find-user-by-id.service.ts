import { Injectable } from "@nestjs/common";
import { PlayersRepository } from "../repository/player.repository";

@Injectable()
export class FindUserByIdService {

    constructor(
        private playerRepository: PlayersRepository
    ) {}

    async handle(userId: string) {
        const player = await this.playerRepository.findById(userId)

        if(!player) throw new Error("Recurso Não Econtrado")

        return {
            player
        }
    }
}