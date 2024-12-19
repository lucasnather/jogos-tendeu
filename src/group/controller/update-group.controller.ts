import { Body, Controller, HttpCode, Param, Put, Req, UseGuards, UsePipes } from "@nestjs/common";
import { Request } from "express"
import { PayloadType } from "src/auth/auth.strategy";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ResourceNotFoundError } from "src/pipes/errors/resource-not-found.error";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import { z } from "zod";
import { UpdateGroupService } from "../service/update-group.service";

const updateGroupBodySchema = z.object({
    name: z.string()
})

const updateParamSchema = z.object({
    groupId: z.coerce.number()
})
 

type UpdateGroupType = z.infer<typeof updateGroupBodySchema>
type UpdateGroupParamType = z.infer<typeof updateParamSchema>

@Controller("/api/groups/:groupId")
export class UpdateGroupController {

    constructor(
        private readonly updateGroupService: UpdateGroupService
    ) {}

    @Put()
    @HttpCode(203)
    //@UsePipes(new ZodValidationPipe(updateGroupBodySchema))
    @UseGuards(JwtAuthGuard)
    async create(@Body() body: UpdateGroupType, @Param() param: UpdateGroupParamType , @Req() request: Request & { user: PayloadType }) {
        try {
            console.log(body)
            const { name } = updateGroupBodySchema.parse(body)
            const { groupId } = updateParamSchema.parse(param)
            const { sub } = request.user

            await this.updateGroupService.handle({
                name,
                groupId,
                playerId: sub
            })

            return {
                data: {
                    type: "Group",
                    status: 201,
                    message: "Grupo atualizado"
                }
            }
        } catch (e) {
            
            if(e instanceof ResourceNotFoundError) {
                return {
                    message: "Error",
                    status: 404,
                    error: e.message
                }
            }
        }
    }
}
