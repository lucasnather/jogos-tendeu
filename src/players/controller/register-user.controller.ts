import { Controller, Get, Post } from "@nestjs/common";
import { RegisterUserService } from "../services/register-user.service";

@Controller('/api/players')
export class RegisterPlayerController {

    constructor(
        private registerPlayersService: RegisterUserService
    ) {}

    @Post()
    async create() {
        return 'Ola'
    }

    @Get()
    async hello() {
        return 'Ola'
    }
}