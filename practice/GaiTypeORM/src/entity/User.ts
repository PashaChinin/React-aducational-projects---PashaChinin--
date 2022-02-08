import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert
} from "typeorm";
import {v4 as uuid} from "uuid";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({type: 'uuid'})
    uuid: string

    @Column()
    age: number;

    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date


    @BeforeInsert()
     createUuid() {
        this.uuid = uuid()
    }
    toJSON() {
        return {...this, id:undefined }
    }
}
