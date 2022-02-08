import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, BeforeInsert} from "typeorm";
import {Office} from "./Office";
import {v4 as uuid} from "uuid";

@Entity()
export class Region extends BaseEntity {

    @PrimaryGeneratedColumn()
    regionID: number;

    @Column({type: 'uuid'})
    uuid: string

    @Column()
    regionName: string;

    @Column()
    regionShortCode: string;

    @BeforeInsert()
    createUuid() {
        this.uuid = uuid()
    }


    @OneToMany(type => Office, office => office.region) // note: we will create author property in the Photo class below
    offices: Office[];



}