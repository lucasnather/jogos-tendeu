import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IndividualMatch } from "./individual-match.entity";
import { TeamMatch } from "./team-match.entity";

@Entity("scores")
export class Scores {

    @PrimaryGeneratedColumn('increment')
    id?: number

    @Column()
    player: string

    @Column()
    score: number

    @Column({ nullable: true })
    position?: number

    @ManyToOne(() => IndividualMatch, individualMatch => individualMatch.scores, { nullable: true })
    individualMatch?: IndividualMatch

    @OneToMany(() => TeamMatch, teamMatch => teamMatch.scores, { nullable: true })
    @JoinColumn({ name: "teamMatchId" })
    teamMatch?: TeamMatch

    @CreateDateColumn({ name: 'created_at' , nullable: true})
    createdAt?: Date

    @UpdateDateColumn({ nullable: true , name: 'updated_at'})
    updatedAt?: Date
}