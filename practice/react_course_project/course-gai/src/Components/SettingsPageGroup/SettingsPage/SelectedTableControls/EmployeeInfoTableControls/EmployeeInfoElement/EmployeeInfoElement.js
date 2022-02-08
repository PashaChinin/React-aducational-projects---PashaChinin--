import { useEffect, useState } from "react";
import axios from "axios";
import classes from "../../CarInformationTableControls/CarInfoElement/CarInfoElement.module.scss";


const EmployeeInfoElement = (props) => {
    const [isExtended, setIsExtended] = useState(false)
    const [reRender, setReRender] = useState(true)
    const [employeeName, setEmployeeName] = useState(props.item.employeeName)
    const [employeePhotoPath, setEmployeePhotoPath] = useState(props.item.employeePhotoPath)
    const [employeeSurname, setEmployeeSurname] = useState(props.item.employeeSurname)
    const [employeeFatherName, setEmployeeFatherName] = useState(props.item.employeeFatherName)
    const [employeePhoneNumber, setEmployeePhoneNumber] = useState(props.item.employeePhoneNumber)
    const [employeeRank, setEmployeeRank] = useState(props.item.employeeRank)
    const [employeePosition, setEmployeePosition] = useState(props.item.employeePosition)
    const [employeePrivateTokenNumber, setEmployeePrivateToken] = useState(null)


    useEffect(() => {
        console.log("Re-render")
    }, [reRender])

    const onElementClickHandler = () => {
        isExtended ? setIsExtended(!isExtended) : setIsExtended(!isExtended)
    }
    const updateOnClickHandler = async () => {

        await axios.put(`http://localhost:5000/employees_info/${props.item.uuid}`,
            {
                employeeName: employeeName,
                employeeSurname: employeeSurname,
                employeeFatherName: employeeFatherName,
                employeePhoneNumber: employeePhoneNumber,
                employeeRank: employeeRank,
                employeePosition: employeePosition,
                employeePrivateTokenNumber: employeePrivateTokenNumber,
                employeePhotoPath: employeePhotoPath
            }).then(()=> setReRender(!reRender))
    }
    const deleteOnClickHandler = async () => {

        await axios.delete(`http://localhost:5000/employees_info/${props.item.uuid}`).then(() => setReRender(!reRender))
    }


    return (
        <div>
            <div onClick={onElementClickHandler} >On/Off</div>
            {isExtended ? <div className={classes.ElementExtended} >
                    <tr>
                        <td>
                            <div>
                                Имя: <input type={"text"}
                                              onChange={(e) => {setEmployeeName(e.target.value)}}
                                              value={employeeName}
                                              placeholder={"NOT NULL!"}/>
                            </div>

                        </td>
                        <td>
                            <div>
                                Фамилия: <input type={"text"}
                                               onChange={(e) => {setEmployeeSurname(e.target.value)}}
                                               value={employeeSurname}
                                               placeholder={"NOT NULL!"} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                Отчество: <input type={"text"}
                                                           onChange={(e) => {setEmployeeFatherName(e.target.value)}}
                                                           value={employeeFatherName}
                                                           placeholder={"NOT NULL!"}/>
                            </div>

                        </td>
                        <td>
                            <div>Звание: <input type={"text"}
                                                        onChange={(e) => {setEmployeeRank(e.target.value)}}
                                                        value={employeeRank}
                                                        placeholder={"NOT NULL!"} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                Должность: <input type={"text"}
                                                      onChange={(e) => {setEmployeePosition(e.target.value)}}
                                                      value={employeePosition}
                                                      placeholder={"NOT NULL!"}/>
                            </div>
                        </td>
                        <td>
                            <div>
                                Тел.номер: <input type={"text"}
                                               onChange={(e) => {setEmployeePhoneNumber(e.target.value)}}
                                               value={employeePhoneNumber}
                                               placeholder={"NOT NULL!"} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                Ссылка на фото: <input type={"text"}
                                                       onChange={(e) => {setEmployeePhotoPath(e.target.value)}}
                                                       value={employeePhotoPath}
                                                       placeholder={"NOT NULL!"}/>
                            </div>

                        </td>
                    </tr>
                    <div>
                        <button onClick={updateOnClickHandler}>Обновить</button><button onClick={deleteOnClickHandler}>Удалить</button>
                    </div>
                </div> :

                <div className={classes.Element} onClick={onElementClickHandler}>
                    {/*<div>ID: {props.item.uuid}</div>*/}
                    <div>Сотрудник: {props.item.employeeSurname + " " + props.item.employeeName}</div>
                    {/*<div>Борт.№: {props.item.onboard_number}</div>*/}
                </div>
            }

        </div>
    )

}
export default EmployeeInfoElement