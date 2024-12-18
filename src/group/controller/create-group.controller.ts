import { Body, Controller, HttpCode, Post, Req, UseGuards, UsePipes } from "@nestjs/common";
import { Request } from "express"
import { PayloadType } from "src/auth/auth.strategy";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import { z } from "zod";
import { CreateGroupService } from "../service/create-group.service";

const createGroupSchema = z.object({
    name: z.string()
})

type CreateGroupType = z.infer<typeof createGroupSchema>

@Controller("/api/groups")
export class CreateGroupController {

    constructor(
        private readonly createGroupService: CreateGroupService
    ) {}

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createGroupSchema))
    @UseGuards(JwtAuthGuard)
    async create(@Body() createGroupType: CreateGroupType, @Req() request: Request & { user: PayloadType }) {
        const { name } = createGroupSchema.parse(createGroupType)
        const { sub } = request.user

        const group =await this.createGroupService.handle({
            name,
            playerId: sub
        })

        return {
            data: {
                type: "Group",
                status: 201,
                group
            }
        }
    }
}