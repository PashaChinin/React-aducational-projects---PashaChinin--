import {BaseEntity, ViewColumn, ViewEntity} from "typeorm";


@ViewEntity({
    expression: `
        SELECT
       "brand",
       "model",
       "engine_power",
       "passed_way",
       "engine_type",
       "engine_volume",
       "car_image",
       "road_sights",
       "spikes",
       "black_bags",
       "emergency_kit",
       B."uuid",
       "government_number",
       "onboard_number",
       "is_using_in_shift" from
        "Car parameters" A JOIN "Car" B on A."paramsID" = B."carParamsParamsID"
        JOIN "Car equipment" C on B."carEquipEquipmentID" = C."equipmentID"
        JOIN "Car information" D on B."carInfoCarInfoID" = D."car_infoID"
    `
})
export class ViewCars extends BaseEntity{

    @ViewColumn()
    is_using_in_shift: boolean;

    @ViewColumn()
    model: string;

    @ViewColumn()
    brand: string;

    @ViewColumn()
    engine_power: number;

    @ViewColumn()
    engine_volume: number;

    @ViewColumn()
    engine_type: string;

    @ViewColumn()
    passed_way: number;

    @ViewColumn()
    car_image: string;

    @ViewColumn()
    road_sights: boolean;

    @ViewColumn()
    spikes: boolean;

    @ViewColumn()
    black_bags: boolean;

    @ViewColumn()
    emergency_kit: boolean;

    @ViewColumn()
    uuid: string;

    @ViewColumn()
    government_number: string;

    @ViewColumn()
    onboard_number: string;

}
