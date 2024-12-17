import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Groups } from "./group.entity";
import { IndividualMatch } from "./individual-match.entity";
import { TeamMatch } from "./team-match.entity";

enum Type {
    TEAM = 'team',
    INDIVIDUAL = 'individual'
}

@Entity("games")
export class Games {

    @PrimaryGeneratedColumn('increment')
    id?: number

    @Column()
    name: string

    @Column({
        type: 'enum',
        enum: Type,
    })
    type: Type

    @ManyToOne(() => Groups, group => group.games, { cascade: true })
    @JoinColumn({ name: 'groupId' })
    group?: Groups

    @OneToOne(() => IndividualMatch, individualMatch => individualMatch.games)
    @JoinColumn({ name: 'individual_match' })
    individualMatch?: IndividualMatch

    @OneToOne(() => TeamMatch, teamMatch => teamMatch.games)
    @JoinColumn({ name: 'team_match' })
    teamMatch?: TeamMatch

    @CreateDateColumn({ name: 'created_at' , nullable: true})
    createdAt?: Date

    @UpdateDateColumn({ nullable: true , name: 'updated_at'})
    updatedAt?: Date
}