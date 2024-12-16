import { Injectable } from "@nestjs/common";
import { compare, hash } from 'bcryptjs'

@Injectable()
export class PasswordHash {

    async hash(password: string) {
        const salt = 8
        return await hash(password, salt)
    }

    async compare(password: string, databasePassword: string) {
        return await compare(password, databasePassword)
    }
}