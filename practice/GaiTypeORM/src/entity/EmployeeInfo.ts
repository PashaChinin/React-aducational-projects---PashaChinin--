import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BeforeInsert, BaseEntity} from "typeorm";
import {Employee} from "./Employee";
import {v4 as uuid} from "uuid";

@Entity()
export class EmployeeInfo extends BaseEntity{

    @PrimaryGeneratedColumn()
    employeeInfoId: number;

    @Column({type: 'uuid'})
    uuid: string

    @Column()
    isUsedAsEmployee: boolean;

    @Column()
    employeeName: string;

    @Column()
    employeeSurname: string;

    @Column()
    employeeFatherName: string;

    @Column()
    employeePhoneNumber: string;

    @Column()
    employeeRank: string;

    @Column()
    employeePosition: string;

    @Column()
    employeePrivateTokenNumber: string;

    @Column()
    employeePhotoPath: string;

    @BeforeInsert()
    createUuid() {
        this.uuid = uuid()
    }
}
