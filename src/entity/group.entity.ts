import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Games } from "./games.entity";
import { Players } from "./players.entity";

@Entity("groups")
export class Groups {

    @PrimaryGeneratedColumn('increment')
    id?: number

    @Column()
    name: string

    @OneToMany(() => Games, games => games.group, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "gamesId"})
    games?: Games[]

    @OneToOne(() => Players, players => players.groups , { cascade: true })
    @JoinColumn({ name: 'playerId'}) 
    players?: Players

    @CreateDateColumn({ name: 'created_at' , nullable: true})
    createdAt?: Date

    @UpdateDateColumn({ nullable: true , name: 'updated_at'})
    updatedAt?: Date
}