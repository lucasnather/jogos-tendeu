import {Controller, Delete, HttpCode, Param, Req, UseGuards, UsePipes } from "@nestjs/common";
import { Request } from "express"
import { PayloadType } from "src/auth/auth.strategy";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ResourceAlreadyCreateError } from "src/pipes/errors/resource-already-create.error";
import { ResourceNotFoundError } from "src/pipes/errors/resource-not-found.error";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import { z } from "zod";
import { DeleteGroupService } from "../service/delete-group.service";

const deleteGroupParamSchema = z.object({
    groupId: z.coerce.number()
})

type DeleteGroupType = z.infer<typeof deleteGroupParamSchema>

@Controller("/api/groups/:groupId")
export class DeleteGroupController {

    constructor(
        private readonly deleteGroupService: DeleteGroupService
    ) {}

    @Delete()
    @HttpCode(203)
    @UsePipes(new ZodValidationPipe(deleteGroupParamSchema))
    @UseGuards(JwtAuthGuard)
    async create(@Param() deleteGroupType: DeleteGroupType,@Req() request: Request & { user: PayloadType }) {
        try {
            const { groupId } = deleteGroupParamSchema.parse(deleteGroupType)
            const { sub } = request.user

            await this.deleteGroupService.handle({
                groupId,
                playerId: sub
            })

            return {
                data: {
                    type: "Group",
                    status: 201,
                    message: "Grupo deletado"
                }
            }
        } catch (e) {
            
            if(e instanceof ResourceAlreadyCreateError || e instanceof ResourceNotFoundError) {
                return {
                    message: "Error",
                    status: 404,
                    error: e.message
                }
            }
        }
    }
}
