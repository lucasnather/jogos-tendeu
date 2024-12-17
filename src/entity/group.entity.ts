import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Games } from "./games.entity";

@Entity("groups")
export class Groups {

    @PrimaryGeneratedColumn('increment')
    id?: number

    @Column()
    name: string

    @OneToMany(() => Games, games => games.group, { cascade: true })
    @JoinColumn({ name: "gamesId" })
    games?: Games[]

    @CreateDateColumn({ name: 'created_at' , nullable: true})
    createdAt?: Date

    @UpdateDateColumn({ nullable: true , name: 'updated_at'})
    updatedAt?: Date
}