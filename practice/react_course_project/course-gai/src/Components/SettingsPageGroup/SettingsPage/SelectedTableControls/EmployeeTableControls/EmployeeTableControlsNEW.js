import classes from "../CarEquipmentTableControls/CarEquipmentTableControls.module.scss";
import CarInfoElement from "../CarInformationTableControls/CarInfoElement/CarInfoElement";
import {useState, useEffect} from "react";
import axios from "axios";
import EmployeeElement from "./EmployeeElement/EmployeeElement";

const EmployeeTableControlsNEW = (props) => {
    let nullVar = null
    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const [selectedEmployeeInfo, setSelectedEmployeeInfo] = useState(null)
    const [selectedShift, setSelectedShift] = useState(null)
    const [shiftList, setShiftList] = useState(null)
    const [departmentList, setDepartmentList] = useState([])
    const [employeeInfoList, setEmployeeInfoList] = useState([])
    //const [response, setResponse] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [employeeList, setEmployeeList] = useState([])

    useEffect(() => {

        console.log("useEffect RENDER")
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        try {
            axios.get('http://localhost:5000/departments', {cancelToken: source.token}).then(response =>
                {
                    //console.log(response.data.toJSON() + " RESPONSE")
                    setDepartmentList(response.data)

                }
            )
            axios.get('http://localhost:5000/employees_info', {cancelToken: source.token}).then(response =>
                {
                    //console.log(response.data.toJSON() + " RESPONSE")
                    setEmployeeInfoList(response.data)

                }
            )
            axios.get('http://localhost:5000/shift', {cancelToken: source.token}).then(response =>
                {
                    //console.log(response.data.toJSON() + " RESPONSE")
                    setShiftList(response.data)
                    setIsLoading(false)

                }
            )
            axios.get('http://localhost:5000/employee', {cancelToken: source.token}).then(response =>
                {
                    //console.log(response.data.toJSON() + " RESPONSE")
                    setEmployeeList(response.data)
                    setIsLoading(false)

                }
            )

        }
        catch (err) {
            if (axios.isCancel(err)) {
                console.log("successfully aborted 2");
            }
            else
            {
                console.log(err)
            }
            setIsLoading(false)
        }

        return () => {
            source.cancel()
        }

    }, [props])

       const onSubmitClickHandler = () => {
           console.log('Selected department - ' + Number.isInteger(selectedDepartment))
           console.log('Selected employeeinfo - ' + Number.isInteger(selectedEmployeeInfo))
           console.log('Selected shift - ' + selectedShift)
        axios.post('http://localhost:5000/employee',
            {
                dep: Number.parseInt(selectedDepartment),
                employeeInfo: Number.parseInt(selectedEmployeeInfo),
                inShift: selectedShift
            })
       }


    return (
        <div>
            {isLoading ? <div>Loading</div> :
                <div style={{display:"flex", flexDirection:"column"}}>
                <select style={{marginTop: 25}} onChange={event => {setSelectedDepartment(event.target.value)}}>
                    { departmentList.map((element, index) => (
                        <option value={element.departmentId} key={index}>
                            {element.departmentName}
                        </option>
                    ))}
                </select>

                <select style={{marginTop: 25}} onChange={event => setSelectedEmployeeInfo(event.target.value)}>
                    <option disabled value={nullVar} selected>Выбрать сотрудника</option>
                    {employeeInfoList.map((element, index) => (
                        element.isUsedAsEmployee ? null : <option value={element.employeeInfoId} key={index}>
                            {element.employeeSurname + " " + element.employeeName + " " + element.employeeFatherName}
                        </option>
                    ))}
                </select>

                <select defaultValue={nullVar} style={{marginTop: 25}} onChange={event => setSelectedShift(event.target.value)}>
                    <option value={nullVar} key={0}>Не выбрано</option>
                    {shiftList.map((element, index) => (
                        element.isClosed ? null : <option value={element.shiftID} key={index+1}>
                            {"Смена №" + element.shiftID + " от " + element.createdAt}
                        </option>
                    ))}
                </select>

                <div style={{marginTop: 25}} className={classes.Buttons}>
                    <button>Отчистить</button>
                    <button onClick={onSubmitClickHandler}>Отправить</button>
                </div>
            </div>}
                <div style={{marginTop: 30}} >


            {<div>
            {employeeList.map((element, index) => (
                <EmployeeElement
                    key={index}
                    item={element}
                    departmentList = {departmentList}
                    shiftList = {shiftList}
                />
                ))}
                </div>}
                </div>


        </div>
    )

}
export default EmployeeTableControlsNEW