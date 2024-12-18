import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Games } from "./games.entity";

@Entity("team_match")
export class TeamMatch {

    @PrimaryGeneratedColumn('increment')
    id?: number

    @Column({ name: "purple_team" , type: 'simple-array'})
    purpleTeam: string[]

    @Column({ name: "yellow_team" , type: 'simple-array'})
    yellowTeam: string[]

    @Column({ name: "winner_team" ,type: 'simple-array'})
    winnerTeam: string[]

    @Column({ nullable: true , type: 'simple-array'})
    winners: string[]

    @OneToOne(() => Games, games => games.teamMatch)
    @JoinColumn( {name: "gamesId" })
    games: Games

    @CreateDateColumn({ name: 'created_at' , nullable: true})
    createdAt?: Date

    @UpdateDateColumn({ nullable: true , name: 'updated_at'})
    updatedAt?: Date
}