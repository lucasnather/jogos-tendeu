import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Sessions } from './session.entity'

@Entity('players')
export class Players {

    @Column({ nullable: true })
    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column()
    name: string

    @Column()
    password: string

    @Column({ unique: true})
    nickname: string

    @Column({ nullable: true })
    role?: string

    @OneToOne(type => Sessions, sessions => sessions.userId, { nullable: true })
    sessions?: Sessions

    @CreateDateColumn({ name: 'created_at' , nullable: true})
    createdAt?: Date

    @Column({ nullable: true , name: 'updated_at'})
    updatedAt?: Date
}