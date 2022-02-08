import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, BeforeInsert, BaseEntity} from "typeorm";
import {Office} from "./Office";
import {Employee} from "./Employee";
import {v4 as uuid} from "uuid";


@Entity('department')
export class Department extends BaseEntity{

    @PrimaryGeneratedColumn()
    departmentId: number;

    @Column()
    departmentName: string;

    @Column({type: 'uuid'})
    uuid: string

    @BeforeInsert()
    createUuid() {
        this.uuid = uuid()
    }

    @ManyToOne( type => Office)
    office: Office;

    @OneToMany(type => Employee, employee => employee.dep)
    employees: Employee[];

}
