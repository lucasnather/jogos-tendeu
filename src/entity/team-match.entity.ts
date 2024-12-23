import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Games } from "./games.entity";
import { Scores } from "./scores.entity";

@Entity("team_match")
export class TeamMatch {

    @PrimaryGeneratedColumn('increment')
    id?: number

    @Column({ name: "purple_team" , type: 'simple-array'})
    purpleTeam: string[]

    @Column({ name: "yellow_team" , type: 'simple-array'})
    yellowTeam: string[]

    @Column({ name: "winner_team" ,type: 'simple-array', nullable: true})
    winnerTeam?: string[]

    @OneToOne(() => Games, games => games.teamMatch)
    @JoinColumn( {name: "gamesId" })
    games?: Games

    @OneToMany(() => Scores, scores => scores.teamMatch)
    @JoinColumn({ name: "scoreId" })
    scores?: Scores[]

    @CreateDateColumn({ name: 'created_at' , nullable: true})
    createdAt?: Date

    @UpdateDateColumn({name: 'updated_at', nullable: true})
    updatedAt?: Date
}