import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn,
    BaseEntity,
    BeforeInsert
} from "typeorm";
import {EmployeeInfo} from "./EmployeeInfo";
import {CarParams} from "./CarParams";
import {CarEquipment} from "./CarEquipment";
import {CarInfo} from "./CarInfo";
import {type} from "os";
import {Shift} from "./Shift";
import {v4 as uuid} from "uuid";


@Entity('Car')
export class Car extends BaseEntity{

    @PrimaryGeneratedColumn()
    carID: number;

    @Column({type: 'uuid'})
    uuid: string

    @Column()
    is_using_in_shift: boolean;

    @OneToOne(type => CarParams)
    @JoinColumn()
    car_params: CarParams;

    @OneToOne(type => CarEquipment)
    @JoinColumn()
    car_equip: CarEquipment;

    @OneToOne(type => CarInfo)
    @JoinColumn()
    car_info: CarInfo;

    @OneToMany(type => Shift, target => target.usingCar)
    shifts: Shift[]

    @BeforeInsert()
    createUuid() {
        this.uuid = uuid()
    }
    @BeforeInsert()
    setShift(){
        this.is_using_in_shift = false
    }
    toJSON() {
        return {...this, id:undefined }
    }
}
