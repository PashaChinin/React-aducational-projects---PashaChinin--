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
import {v4 as uuid} from "uuid";


@Entity('Car parameters')
export class CarParams extends BaseEntity{

    @PrimaryGeneratedColumn()
    paramsID: number;

    @Column({type: 'uuid'})
    uuid: string

    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    engine_power: number;

    @Column()
    passed_way: number;

    @Column()
    engine_type: string;

    @Column('float')
    engine_volume: number;

    @Column({nullable:true})
    car_image: string;

    @BeforeInsert()
    createUuid() {
        this.uuid = uuid()
    }
    toJSON() {
        return {...this, paramsID:undefined }
    }

}