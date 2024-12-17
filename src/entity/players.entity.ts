import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Sessions } from './session.entity'

enum Role {
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

    @OneToOne(() => Sessions, sessions => sessions.player, { nullable: true , cascade: true})
    @JoinColumn({ name: 'sessionId' })
    sessions?: Sessions

    @CreateDateColumn({ name: 'created_at' , nullable: true})
    createdAt?: Date

    @UpdateDateColumn({ nullable: true , name: 'updated_at'})
    updatedAt?: Date
}