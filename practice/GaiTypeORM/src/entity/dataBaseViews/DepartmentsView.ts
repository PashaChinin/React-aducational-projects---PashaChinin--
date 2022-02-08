import {BaseEntity, ViewColumn, ViewEntity} from "typeorm";


@ViewEntity({
    expression: `
        SELECT table_name FROM information_schema.tables
WHERE table_schema NOT IN ('information_schema','pg_catalog') AND table_schema IN('public') AND table_name in
('employee_info','Car','department','employee','Car information','office','Car equipment', 'Car parameters',
'region','Shift','user');
    `
})
export class ViewEmployee extends BaseEntity{

    @ViewColumn()
    table_name: string;


}