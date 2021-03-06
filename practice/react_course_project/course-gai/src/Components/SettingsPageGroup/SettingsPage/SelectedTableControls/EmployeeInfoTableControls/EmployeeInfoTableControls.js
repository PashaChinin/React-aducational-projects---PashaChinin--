import classes from "../CarEquipmentTableControls/CarEquipmentTableControls.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeInfoElement from "./EmployeeInfoElement/EmployeeInfoElement";

const EmployeeInfoTableControls = () => {
    const [employeeInfoList, setEmployeeInfoList] = useState([])
    const [didMounted, setDidMounted] = useState(false)
    const [employeeName, setEmployeeName] = useState(null)
    const [employeePhotoPath, setEmployeePhotoPath] = useState(null)
    const [employeeSurname, setEmployeeSurname] = useState()
    const [employeeFatherName, setEmployeeFatherName] = useState(null)
    const [employeePhoneNumber, setEmployeePhoneNumber] = useState(null)
    const [employeeRank, setEmployeeRank] = useState(null)
    const [employeePosition, setEmployeePosition] = useState(null)
    const [employeePrivateTokenNumber, setEmployeePrivateToken] = useState(null)




    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        try {
            axios.get('http://localhost:5000/employees_info').then(response => {
                    setEmployeeInfoList(response.data)
                }
            )
            setDidMounted(true)
        } catch (e) {
            console.log("Something went wrong")
        }
        return () => {
            source.cancel()
        }
    }, [])

    const onClickSubmitOperationHandler = () => {

        axios.post('http://localhost:5000/employees_info', {
            employeeName: employeeName,
            employeeSurname: employeeSurname,
            employeeFatherName: employeeFatherName,
            employeePhoneNumber: employeePhoneNumber,
            employeeRank: employeeRank,
            employeePosition: employeePosition,
            employeePrivateTokenNumber: employeePrivateTokenNumber,
            employeePhotoPath: employeePhotoPath
        })
    }



    return (
        <div className={classes.CarEquipmentTableControls}>
            <div>
                <div style={{marginBottom: 20}}>
                    <table>
                        <td>
                            <tr>??????:</tr>
                            <tr>??????????????:</tr>
                            <tr>????????????????:</tr>
                            <tr>????????????:</tr>
                            <tr>??????????????????:</tr>
                            <tr>?????????? ????????????????:</tr>
                            <tr>??????????:</tr>
                            <tr>URL ????????:</tr>
                        </td>
                        <td>
                            <tr><input type={"text"} onChange={(event => setEmployeeName(event.target.value))} placeholder={"?????? ????????????????????"}/></tr>
                            <tr><input type={"text"} onChange={(event => setEmployeeSurname(event.target.value))} placeholder={"?????????????? ????????????????????"}/></tr>
                            <tr><input type={"text"} onChange={(event => setEmployeeFatherName(event.target.value))} placeholder={"???????????????? ??????????????????"}/></tr>
                            <tr><input type={"text"} onChange={(event => setEmployeeRank(event.target.value))} placeholder={"???????????? ??????????????????"}/></tr>
                            <tr><input type={"text"} onChange={(event => setEmployeePosition(event.target.value))} placeholder={"?????????????????? ??????????????????"}/></tr>
                            <tr><input type={"text"} onChange={(event => setEmployeePhoneNumber(event.target.value))} placeholder={"?????????? ?????? ??????????"}/></tr>
                            <tr><input type={"text"} onChange={(event => setEmployeePrivateToken(event.target.value))} placeholder={"???????????? ?????????? ????????????????????"}/></tr>
                            <tr><input type={"text"} onChange={(event => setEmployeePhotoPath(event.target.value))} placeholder={"URL ???????? ????????????????????"}/></tr>
                        </td>
                    </table>

                </div>
                <div className={classes.Buttons}>
                    <button>??????????????????</button>
                    <button onClick={onClickSubmitOperationHandler}>??????????????????</button>
                </div>
            </div>
            <div>
                {didMounted ? <div>
                    {employeeInfoList.map((element, index) => (
                        <EmployeeInfoElement key={index} item={element}/>
                    ))}
                </div> : "LOADING"}
            </div>

        </div>
    )
}
export default EmployeeInfoTableControls