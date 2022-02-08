import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
    BaseEntity,
    BeforeInsert
} from "typeorm";
import {Department} from "./Department";
import {type} from "os";
import {Shift} from "./Shift";
import {EmployeeInfo} from "./EmployeeInfo";
import {v4 as uuid} from "uuid";


@Entity()
export class Employee extends BaseEntity{

    @PrimaryGeneratedColumn()
    employeeID: number;

    @Column({type:'uuid'})
    uuid: string

    @ManyToOne( type => Department)
    @JoinColumn()
    dep: Department;

    @ManyToOne(type => Shift)
    @JoinColumn()
    inShift: Shift;

    @OneToOne(type => EmployeeInfo)
    @JoinColumn()
    employeeInfo: EmployeeInfo;

    @BeforeInsert()
    createUuid(){
        this.uuid = uuid()
    }
}
