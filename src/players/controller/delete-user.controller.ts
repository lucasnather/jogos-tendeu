import { Controller, Delete, Get, HttpCode, Req, UseGuards } from "@nestjs/common";
import { Request } from "express"
import { PayloadType } from "src/auth/auth.strategy";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ResourceNotFoundError } from "src/pipes/errors/resource-not-found.error";
import { DeleteUserService } from "../services/delete-user.service";
import { FindUserByIdService } from "../services/find-user-by-id.service";

@Controller("/api/players")
export class DeleteUserController {

    constructor(
        private deletUserService: DeleteUserService
    ) {}

    @Delete()
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async find(@Req() request: Request & { user: PayloadType }) {
        try {
            const { sub } = request.user

            const { player } = await this.deletUserService.handle(sub)

            return {
                data: {
                    type: "Player",
                    status: 200,
                    message: `Jogador ${player.nickname} deletado`
                }
            }
        } catch (e) {
            if( e instanceof ResourceNotFoundError) {
                return {
                    message: "Error",
                    status: 404,
                    error: e.message
                }
            }
        }
    }
}


