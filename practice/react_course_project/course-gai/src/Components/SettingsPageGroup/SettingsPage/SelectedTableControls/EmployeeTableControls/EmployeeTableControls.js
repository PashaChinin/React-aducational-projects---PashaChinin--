import { useEffect, useState } from "react";
import axios from "axios";
import { cleanup } from "@testing-library/react";
import classes from "../CarEquipmentTableControls/CarEquipmentTableControls.module.scss";


const EmployeeTableControls = (props) => {
    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const [selectedEmployeeInfo, setSelectedEmployeeInfo] = useState(null)
    const [selectedShift, setSelectedShift] = useState(null)
    const [shiftList, setShiftList] = useState(null)
    const [departmentList, setDepartmentList] = useState([])
    const [employeeInfoList, setEmployeeInfoList] = useState([])
    const [response, setResponse] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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

    }, [])

    const onClickSubmitOperationHandler = () => {
        console.log("Selected Operation - " + props.operation)
        switch (props.operation) {

            case'post(CREATE)':
                axios.post('http://localhost:5000/employee', {
                    dep: selectedDepartment,
                    employeeInfo: selectedEmployeeInfo,
                    inShift: selectedShift
                }).then((response) => {
                    setResponse(response)
                })

                break
            case 'get(READ)' :
                axios.get('http://localhost:5000/employee').then((response) => {
                    setResponse(response)
                })
                break
            case 'put(UPDATE)':
                axios.put(`http://localhost:5000/employee/${selectedEmployeeInfo}`, {
                    dep: selectedDepartment,
                    employeeInfo: selectedEmployeeInfo,
                    inShift: selectedShift
                }).then((response) => {
                    setResponse(response)
                })
                break
            case 'delete(DELETE)' :
                axios.delete(`http://localhost:5000/employee/${selectedEmployeeInfo}`).then((response) => {
                    setResponse(response)
                })
                break
            case 'get(FIND)':
                axios.get(`http://localhost:5000/employee/${selectedEmployeeInfo}`).then((response) => {
                    setResponse(response)
                })
                break
            default:


        }
    }

    return (

        <div style={{display:"flex", flexDirection:"column"}}>
            {isLoading ? <p>Loading</p> : <select style={{marginTop: 25}} onChange={event => {setSelectedDepartment(event.target.value)}}>
                { departmentList.map((element, index) => (
                    <option value={element.uuid} key={index}>
                        {element.departmentName}
                    </option>
                ))}
            </select>}

            {isLoading ? <p>Loading</p> : <select style={{marginTop: 25}} onChange={event => setSelectedEmployeeInfo(event.target.value)}>
                {employeeInfoList.map((element, index) => (
                    element.isUsedAsEmployee ? null : <option value={element.uuid} key={index}>
                        {element.employeeSurname + " " + element.employeeName + " " + element.employeeFatherName}
                    </option>
                ))}
            </select>}

            {isLoading ? <p>Loading</p> : <select style={{marginTop: 25}} onChange={event => setSelectedShift(event.target.value)}>
                <option value={null} selected>Не выбрано</option>
                {shiftList.map((element, index) => (
                    element.isClosed ? null : <option value={element.uuid} key={index}>
                        {"Смена №" + element.shiftID + " от " + element.createdAt}
                    </option>
                ))}
            </select>}

            <div style={{marginTop: 25}} className={classes.Buttons}>
                <button>Отчистить</button>
                <button onClick={onClickSubmitOperationHandler}>Отправить</button>
            </div>
            {props.operation === "get(READ)" ? <button onClick={onClickSubmitOperationHandler}>Получить список</button> : null}
            {props.operation === "put(UPDATE)" ? <input type={"text"} placeholder={"Id элемента для изменения"}/> : null}
            <div style={{marginTop: 20, marginBottom: 20, fontSize: 24}}>Ответ сервера на запрос</div>
            <div style={{display: "inline-block", maxWidth: 600, overflow:"scroll"}}>{JSON.stringify(response.data)}</div>


        </div>
    )

}
export default EmployeeTableControls