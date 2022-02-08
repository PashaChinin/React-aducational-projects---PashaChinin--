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


@Entity('Car equipment')
export class CarEquipment extends BaseEntity{

    @PrimaryGeneratedColumn()
    equipmentID: number;

    @Column({type: 'uuid'})
    uuid: string

    @Column()
    road_sights: boolean;

    @Column()
    spikes: boolean;

    @Column()
    black_bags: boolean;

    @Column()
    emergency_kit: boolean;

    @BeforeInsert()
    createUuid() {
        this.uuid = uuid()
    }
    toJSON() {
        return {...this, equipmentID:undefined }
    }

}