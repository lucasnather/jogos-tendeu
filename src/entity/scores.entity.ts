import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IndividualMatch } from "./individual-match.entity";

@Entity("scores")
export class Scores {

    @PrimaryGeneratedColumn('increment')
    id?: number

    @Column()
    player: string

    @Column()
    score: number

    @OneToOne(() => IndividualMatch, individualMatch => individualMatch.scores)
    @JoinColumn({ name: "individualMatchId" })
    individualMatch?: IndividualMatch

    @CreateDateColumn({ name: 'created_at' , nullable: true})
    createdAt?: Date

    @UpdateDateColumn({ nullable: true , name: 'updated_at'})
    updatedAt?: Date
}