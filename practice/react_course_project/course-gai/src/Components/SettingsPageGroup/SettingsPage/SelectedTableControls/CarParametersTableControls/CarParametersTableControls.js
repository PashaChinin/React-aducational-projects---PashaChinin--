import classes from "../CarEquipmentTableControls/CarEquipmentTableControls.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import CarInfoElement from "../CarInformationTableControls/CarInfoElement/CarInfoElement";
import CarParametersElement from "./CarParametersElement/CarParametersElement";

const CarParametersTableControls = () => {
    const [carParamsList, setCarParamsList] = useState([])
    const [didMounted, setDidMounted] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)
    const [brand, setBrand] = useState()
    const [model, setModel] = useState(null)
    const [enginePower, setEnginePower] = useState(null)
    const [engineType, setEngineType] = useState(null)
    const [engineVolume, setEngineVolume] = useState(null)
    const [passedWay, setPassedWay] = useState(null)



    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        try {
            axios.get('http://localhost:5000/car_parameters').then(response => {
                    setCarParamsList(response.data)
                }
            )
            setDidMounted(true)
        } catch (e) {
            console.log("Something went wrong")
        }
        return () => {
            source.cancel()
        }
    })

    const onClickSubmitOperationHandler = () => {

        axios.post('http://localhost:5000/car_parameters', {
            brand: brand,
            model: model,
            engine_power: enginePower,
            passed_way: passedWay,
            engine_type: engineType,
            engine_volume: engineVolume,
            car_image: imageUrl
        })

    }



    return (
        <div className={classes.CarEquipmentTableControls}>
            <div>
                <div style={{marginBottom: 20}}>
                    <table>
                        <td>
                            <tr>URL Изображения:</tr>
                            <tr>Бренд:</tr>
                            <tr>Модель:</tr>
                            <tr>Мощность двигателя:</tr>
                            <tr>Тип двигателя:</tr>
                            <tr>Объем двигателя:</tr>
                            <tr>Пробег:</tr>
                        </td>
                        <td>
                            <tr><input type={"text"} onChange={(event => setImageUrl(event.target.value))} placeholder={"URL изображения"}/></tr>
                            <tr><input type={"text"} onChange={(event => setBrand(event.target.value))} placeholder={"Бренд"}/></tr>
                            <tr><input type={"text"} onChange={(event => setModel(event.target.value))} placeholder={"Модель"}/></tr>
                            <tr><input type={"text"} onChange={(event => setEnginePower(event.target.value))} placeholder={"Мощность двигателя"}/></tr>
                            <tr><input type={"text"} onChange={(event => setEngineType(event.target.value))} placeholder={"Тип двигателя"}/></tr>
                            <tr><input type={"text"} onChange={(event => setEngineVolume(event.target.value))} placeholder={"Объем двигателя"}/></tr>
                            <tr><input type={"text"} onChange={(event => setPassedWay(event.target.value))} placeholder={"Пробег"}/></tr>
                        </td>
                    </table>

                </div>
                <div className={classes.Buttons}>
                    <button>Отчистить</button>
                    <button onClick={onClickSubmitOperationHandler}>Отправить</button>
                </div>
            </div>
            <div>
                {didMounted ? <div>
                    {carParamsList.map((element, index) => (
                        <CarParametersElement key={index} item={element}/>
                    ))}
                </div> : "LOADING"}
            </div>

        </div>
    )
}
export default CarParametersTableControls