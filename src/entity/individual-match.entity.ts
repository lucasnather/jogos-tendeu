import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Games } from "./games.entity";

@Entity("individual_match")
export class IndividualMatch {

    @PrimaryGeneratedColumn('increment')
    id?: number

    @Column({ type: 'simple-array' })
    players: string[]

    @Column({ nullable: true , type: 'simple-array'})
    winner?: string

    @OneToOne(() => Games, games => games.individualMatch)
    @JoinColumn( {name: "gamesId" })
    games?: Games

    @CreateDateColumn({ name: 'created_at' , nullable: true})
    createdAt?: Date

    @UpdateDateColumn({ nullable: true , name: 'updated_at'})
    updatedAt?: Date
}