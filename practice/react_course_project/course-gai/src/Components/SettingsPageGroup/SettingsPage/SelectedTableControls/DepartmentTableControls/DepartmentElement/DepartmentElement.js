import { useEffect, useState } from "react";
import axios from "axios";
import classes from "../../CarInformationTableControls/CarInfoElement/CarInfoElement.module.scss";

const DepartmentElement = (props) => {
    const [isExtended, setIsExtended] = useState(false)
    const [reRender, setReRender] = useState(true)
    const [departmentList, setDepartmentList] = useState(props.departmentList)
    const [officeList, setOfficeList] = useState(props.officeList)
    const [selectedDepartment, setSelectedDepartment] = useState(props.item.departmentName)
    const [selectedOffice , setSelectedOffice] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
        console.log("Re-render")
    }, [reRender, props])

    const onElementClickHandler = () => {
        isExtended ? setIsExtended(!isExtended) : setIsExtended(!isExtended)
    }
    const updateOnClickHandler = async () => {
        setReRender(!reRender)

        await axios.put(`http://localhost:5000/departments/`, {departmentId: props.item.departmentId,departmentName:selectedDepartment,officeID:Number(selectedOffice)})
    }
    const deleteOnClickHandler = async () => {

        await axios.delete(`http://localhost:5000/departments/${props.item.uuid}`)
    }

    return (

        <div>
            <div onClick={onElementClickHandler} >On/Off</div>
            {isExtended && isLoaded ? <div className={classes.ElementExtended}>
                    <tr>
                        <td>
                            <div>
                                Отдел: <input type={"text"} placeholder={"Название отдела"} value={selectedDepartment} onChange={(event => setSelectedDepartment(event.target.value))}/>
                            </div>

                        </td>
                        <td>
                            <div>
                                Управление:<select onChange={event => setSelectedOffice(event.target.value)}>
                                <option value={null}>Не изменять</option>
                                {officeList.map((element, index) => (
                                    <option value={element.officeID} key={index} selected={props.item.officeID === element.officeID}>
                                        {"ID: " + element.officeID + " | " + element.officeName}
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
                    <div>Название: {props.item.departmentName + " (" + props.item.uuid + ")"}</div>
                </div>
            }

        </div>
    )
}
export default DepartmentElement