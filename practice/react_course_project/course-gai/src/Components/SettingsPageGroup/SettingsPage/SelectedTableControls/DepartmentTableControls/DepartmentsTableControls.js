import { useEffect, useState } from "react";
import axios from "axios";
import { cleanup } from "@testing-library/react";
import classes from "../CarEquipmentTableControls/CarEquipmentTableControls.module.scss";
import CarInfoElement from "../CarInformationTableControls/CarInfoElement/CarInfoElement";
import DepartmentElement from "./DepartmentElement/DepartmentElement";


const DepartmentsTableControls = (props) => {
    const [selectedOffice, setSelectedOffice] = useState(null)
    const [officeList, setOfficeList] = useState([])
    const [departmentName, setDepartmentName] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [departmentList, setDepartmentList] = useState([])


    useEffect(() => {

        console.log("useEffect RENDER")
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        try {
            axios.get('http://localhost:5000/offices', {cancelToken: source.token}).then(response =>
                {
                    //console.log(response.data.toJSON() + " RESPONSE")
                    setOfficeList(response.data)
                    setIsLoading(false)
                })
            axios.get('http://localhost:5000/departments', {cancelToken: source.token}).then(response =>
                {
                    //console.log(response.data.toJSON() + " RESPONSE")
                    setDepartmentList(response.data)
                    setIsLoading(false)
                }
            )
        }
        catch (err) {
            if (axios.isCancel(err)) {
                console.log("successfully aborted");
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

    const onClickSubmitEventHandler = async () => {
        await axios.post('http://localhost:5000/departments', {departmentName: departmentName, officeId: selectedOffice})
    }
    const onClickClearEventHandler =  () => {

    }


    return (

        <div>
            <div>
                Название отдела: <input type={"text"} placeholder={"Название отдела"} onChange={(e => setDepartmentName(e.target.value))}/>
            </div>
            {isLoading ? <p>Loading</p> : <select onChange={e => setSelectedOffice(e.target.value)}>
                { officeList.map((element, index) => (
                    <option value={element.officeID} key={index}>
                        {element.officeName + ` : id(${element.officeID})`}
                    </option>
                ))}
            </select>}

            <div style={{marginTop: 25}} className={classes.Buttons}>
                <button>Отчистить</button>
                <button onClick={onClickSubmitEventHandler}>Отправить</button>
            </div>
            <div style={{marginTop: 30}} >


                <div>
                    {departmentList.map((element, index) => (
                        <DepartmentElement
                            key={index}
                            item={element}
                            officeList={officeList}
                        />
                    ))}
                </div>
            </div>


        </div>
    )

}
export default DepartmentsTableControls