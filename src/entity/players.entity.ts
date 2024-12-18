import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Groups } from './group.entity'
import { Sessions } from './session.entity'

export enum Role {
    ADMIN = 'admin',
    USER = 'user'
}

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

    @Column({ nullable: true , enum: Role, type: 'enum', default: Role.USER})
    role?: string

    @OneToMany(() => Groups, groups => groups.players)
    @JoinColumn()
    groups?: Groups[]

    @OneToOne(() => Sessions, sessions => sessions.player, { nullable: true , cascade: true})
    @JoinColumn({ name: 'sessionId' })
    sessions?: Sessions

    @CreateDateColumn({ name: 'created_at' , nullable: true})
    createdAt?: Date

    @UpdateDateColumn({ nullable: true , name: 'updated_at'})
    updatedAt?: Date
}