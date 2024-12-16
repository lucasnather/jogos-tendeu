import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Sessions } from './session.entity'

@Entity('players')
export class Players {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    password: string

    @Column({ unique: true })
    nickname: string

    @Column()
    role: string

    @OneToOne(type => Sessions, sessions => sessions.userId, { nullable: true })
    sessions?: Sessions

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @Column({ nullable: true , name: 'updated_at'})
    updatedAt?: Date
}