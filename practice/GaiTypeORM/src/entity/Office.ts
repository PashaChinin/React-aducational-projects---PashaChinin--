import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity, BeforeInsert} from "typeorm";
import {Region} from "./Region";
import {Department} from "./Department";
import {v4 as uuid} from "uuid";

@Entity()
export class Office extends BaseEntity{

    @PrimaryGeneratedColumn()
    officeID: number;

    @Column()
    officeName: string;

    @Column({type: 'uuid'})
    uuid: string

    @BeforeInsert()
    createUuid() {
        this.uuid = uuid()
    }

    @ManyToOne( type => Region)
    region: Region;

    @OneToMany(type => Department, department => department.office)
    departments: Department[];

}