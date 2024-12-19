import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Players } from "./players.entity";

@Entity('sessions')
export class Sessions {

    @PrimaryGeneratedColumn('increment')
    id?: number

    @Column()
    ip: string

    @Column({ name: 'user_agent' })
    userAgent: string

    @Column({ default: false })
    active?: boolean

    @OneToOne(() => Players, player => player.sessions, { cascade: true , onDelete: 'CASCADE',})
    @JoinColumn({ name: 'playerId'}) 
    player?: Players

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date

    @UpdateDateColumn({ nullable: true , name: 'updated_at'})
    updatedAt?: Date
}