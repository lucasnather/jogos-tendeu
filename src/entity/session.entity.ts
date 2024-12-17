import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('sessions')
export class Sessions {

    @PrimaryGeneratedColumn('increment')
    id?: number

    @Column({ name: 'user_id' })
    userId: string

    @Column()
    ip: string

    @Column({ name: 'user_agent' })
    userAgent: string

    @Column({ default: false })
    active?: boolean

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date

    @Column({ nullable: true , name: 'updated_at'})
    updatedAt?: Date
}