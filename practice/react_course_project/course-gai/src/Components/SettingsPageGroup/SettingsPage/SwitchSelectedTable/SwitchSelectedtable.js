import CarEquipmentTableControls from "../SelectedTableControls/CarEquipmentTableControls/CarEquipmentTableControls";
import DepartmentsTableControls from "../SelectedTableControls/DepartmentTableControls/DepartmentsTableControls";
import OfficeTableControls from "../SelectedTableControls/OfficeTableControls/OfficeTableControls";
import CarParametersTableControls from "../SelectedTableControls/CarParametersTableControls/CarParametersTableControls";
import EmployeeInfoTableControls from "../SelectedTableControls/EmployeeInfoTableControls/EmployeeInfoTableControls";
import CarTableControls from "../SelectedTableControls/CarTableControls/CarTableControls";
import RegionTableControls from "../SelectedTableControls/RegionTableControls/RegionTableControls";
import ShiftTableControls from "../SelectedTableControls/ShiftTableControls/ShiftTableControls";
import DefaultTableControls from "../SelectedTableControls/DefaultTableControls/DefaultTableControls";
import CarInformationTableControlsNEW from "../SelectedTableControls/CarInformationTableControls/CarInformationTableControlsNEW";
import EmployeeTableControlsNEW from "../SelectedTableControls/EmployeeTableControls/EmployeeTableControlsNEW";


const SwitchSelectedTable = (props) => {
    let switchedTable = null
    console.log('Switch props ' + props.table)

    switch (props.table) {
        case 'Car equipment':
            switchedTable = <CarEquipmentTableControls operation={props.option}/>
        break;
        case 'Car information':
            switchedTable = <CarInformationTableControlsNEW operation={props.option}/>
            break;
        case 'employee':
            switchedTable = <EmployeeTableControlsNEW operation={props.option}/>
            break;
        case 'department':
            switchedTable = <DepartmentsTableControls operation={props.option}/>
            break;
        case 'office':
            switchedTable = <OfficeTableControls operation={props.option}/>
            break;
        case 'Car parameters':
            switchedTable = <CarParametersTableControls operation={props.option}/>
            break;
        case 'employee_info':
            switchedTable = <EmployeeInfoTableControls operation={props.option}/>
            break;
        case 'Car':
            switchedTable = <CarTableControls operation={props.option}/>
            break;
        case 'region':
            switchedTable = <RegionTableControls operation={props.option}/>
            break;
        case 'Shift':
            switchedTable = <ShiftTableControls operation={props.option}/>
            break;
        case 'user':
            switchedTable = <DefaultTableControls operation={props.option}/>
            break;
        default:
            switchedTable = <DefaultTableControls operation={props.option}/>
    }
    return (
        switchedTable
    )
}
export default SwitchSelectedTable