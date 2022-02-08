import { useEffect, useState } from "react";
import axios from "axios";
import classes from "../../CarInformationTableControls/CarInfoElement/CarInfoElement.module.scss";

const EmployeeElement = (props) => {
    const [isExtended, setIsExtended] = useState(false)
    const [reRender, setReRender] = useState(true)
    const [departmentList, setDepartmentList] = useState(props.departmentList)
    const [shiftList, setShiftList] = useState(props.shiftList)
    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const [selectedShift , setSelectedShift] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
        console.log("Re-render")
    }, [reRender])

    const onElementClickHandler = () => {
        isExtended ? setIsExtended(!isExtended) : setIsExtended(!isExtended)
    }
    const updateOnClickHandler = async () => {
        setReRender(!reRender)

        await axios.put(`http://localhost:5000/employee/`, {id:props.item.employeeID,dep:selectedDepartment,inShift:selectedShift})
    }
    const deleteOnClickHandler = async () => {

        await axios.delete(`http://localhost:5000/employee/${props.item.employeeID}`)
    }

    return (

        <div>
            <div onClick={onElementClickHandler} >On/Off</div>
            {isExtended && isLoaded ? <div className={classes.ElementExtended}>
                    <tr>
                        <td>
                            <div>
                                Отдел: <select style={{marginTop: 25}} onChange={event => {setSelectedDepartment(event.target.value)}}>

                                { departmentList.map((element, index) => (
                                    <option value={element.departmentId} key={index} selected={props.item.departmentName === element.departmentName}>
                                        {element.departmentName}
                                    </option>
                                ))}
                            </select>
                            </div>

                        </td>
                        <td>
                            <div>
                                Смена(Опционально): <select style={{marginTop: 25}} onChange={event => setSelectedShift(event.target.value)}>
                                <option value={null} selected={props.item.inShiftShiftID === null}>Не выбрано</option>
                                {shiftList.map((element, index) => (
                                    element.isClosed ? null : <option value={element.shiftID} key={index} selected={props.item.inShiftShiftID === element.shiftID}>
                                        {"Смена №" + element.shiftID + " от " + element.createdAt}
                                    </option>
                                ))}
                            </select>
                            </div>

                        </td>
                    </tr>
                    <div>
                        <button onClick={updateOnClickHandler}>Обновить</button><button onClick={deleteOnClickHandler}>Удалить</button>
                    </div>
                </div> :

                <div className={classes.Element} onClick={onElementClickHandler}>
                    <div>Сотрудник: {props.item.employeeSurname + " " + props.item.employeeName}</div>
                    <div>Звание: {props.item.employeeRank}</div>

                </div>
            }

        </div>
    )
}
export default EmployeeElement