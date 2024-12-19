import { Controller, Get, HttpCode, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { PayloadType } from "src/auth/auth.strategy";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { LogoutService } from "../services/logout.service";

@Controller("/api/logout")
export class LogoutController {

    constructor(
        private readonly logoutService: LogoutService
    ) {}

    @Get()
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async logout(@Req() request: Request & { user: PayloadType }) {
        const { sub} = request.user

        await this.logoutService.handle({
            playerId: sub
        })

        return {
            data: {
                message: "Logout"
            }
        }
    }
}