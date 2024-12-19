import { Controller, Get, HttpCode, Req, UseGuards } from "@nestjs/common";
import { Request } from "express"
import { PayloadType } from "src/auth/auth.strategy";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ResourceNotFoundError } from "src/pipes/errors/resource-not-found.error";
import { FindUserByIdService } from "../services/find-user-by-id.service";

@Controller("/api/players")
export class FindUserByIdController {

    constructor(
        private findByUserIdService: FindUserByIdService
    ) {}

    @Get()
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async find(@Req() request: Request & { user: PayloadType }) {
        try {
            const player = await this.findByUserIdService.handle(request.user.sub)

            return {
                data: {
                    type: "Player",
                    status: 200,
                    player
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


