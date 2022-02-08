import {BaseEntity, ViewColumn, ViewEntity} from "typeorm";


@ViewEntity({
    expression: `
        SELECT
        "inShiftShiftID",
       "employeeName",
       "employeeSurname" ,
       "employeeID",
\t"employeeFatherName" ,
\t"employeePhoneNumber",
\t"employeeRank",
\t"employeePosition",
\t"employeePrivateTokenNumber",
\t"employeePhotoPath",
       "departmentName",
       "officeName",
       "regionName" from employee_info A JOIN employee B ON
           A."employeeInfoId" = B."employeeInfoEmployeeInfoId" JOIN department C ON
               C."departmentId" = B."depDepartmentId" JOIN office D ON C."officeOfficeID" = D."officeID"
                    JOIN region r on D."regionRegionID" = r."regionID"
    `
})
export class ViewEmployees extends BaseEntity{

    @ViewColumn()
    employeeID: number;

    @ViewColumn()
    inShiftShiftID: number;

    @ViewColumn()
    employeeName: string;

    @ViewColumn()
    employeeSurname: string;

    @ViewColumn()
    employeeFatherName: string;

    @ViewColumn()
    employeePhoneNumber: string;

    @ViewColumn()
    employeeRank: string;

    @ViewColumn()
    employeePosition: string;

    @ViewColumn()
    employeePrivateTokenNumber: string;

    @ViewColumn()
    employeePhotoPath: string;

    @ViewColumn()
    departmentName: string;

    @ViewColumn()
    officeName: string;

    @ViewColumn()
    regionName: string;

}
