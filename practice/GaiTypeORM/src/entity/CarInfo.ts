import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn, BaseEntity} from "typeorm";
import {EmployeeInfo} from "./EmployeeInfo";


@Entity('Car information')
export class CarInfo extends BaseEntity{

    @PrimaryGeneratedColumn()
    car_infoID: number;

    @Column()
    government_number: string;

    @Column()
    onboard_number: number;

}