import classes from "../CarEquipmentTableControls/CarEquipmentTableControls.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import CarInfoElement from "./CarInfoElement/CarInfoElement";

const CarInformationTableControlsNEW = (props) => {

    const [carInfoList, setCarInfoList] =  useState([])
    const [didMounted, setDidMounted] = useState(false)
    const [governmentNumber, setGovernmentNumber] = useState("")
    const [onBoardNumber, setOnBoardNumber] = useState("")

    const onClickSubmitOperationHandler = () => {

                 axios.post('http://localhost:5000/car_info',
                     {government_number:governmentNumber,
                         onboard_number: onBoardNumber
                     })


    }


    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        try {
            axios.get('http://localhost:5000/car_info').then(response => {
                setCarInfoList(response.data)
                }
            )
            setDidMounted(true)
        }
        catch (e) {
        console.log("Something went wrong")
        }
        return () => {
            source.cancel()
        }
    })


    return (
        <div>
            <div>
                <div style={{marginBottom: 20}}>
                    <div>Государственный номер: <input placeholder={"Государственный номер"} value={governmentNumber} id={"governmentNumInput"} type={"text"}
                                                       onChange={(e) => setGovernmentNumber(e.target.value)}/></div>
                    <div>Бортовой номер: <input placeholder={"Бортовой номер"} value={onBoardNumber} id={"onBoardNumInput"} type={"text"}
                                                onChange={(e) => setOnBoardNumber(e.target.value)}/></div>
                </div>
                <div className={classes.Buttons}>
                    <button>Отчистить</button>
                    <button onClick={onClickSubmitOperationHandler}>Создать</button>
                </div>
            </div>
            <div style={{marginTop: 30}} >


                {didMounted ? <div>
                    {carInfoList.map((element, index) => (
                        <CarInfoElement key={index} item={element}/>
                    ))}
                </div> : "LOADING"}
            </div>
        </div>
    )
}
export default CarInformationTableControlsNEW