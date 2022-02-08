import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn, BeforeInsert, BaseEntity, JoinColumn
} from "typeorm";
import {Employee} from "./Employee";
import {type} from "os";
import {Car} from "./Car";
import {v4 as uuid} from "uuid";

@Entity('Shift')
export class Shift extends BaseEntity {

    @PrimaryGeneratedColumn()
    shiftID: number;

    @Column()
    isClosed: boolean;

    @Column({type: 'uuid'})
    uuid: string;

    @OneToMany(type => Employee, target => target.inShift)
    //@JoinColumn()
    employee: Employee[];

    @ManyToOne(type => Car)
    usingCar: Car

    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert()
    createUuid() {
        this.uuid = uuid()
    }
}
