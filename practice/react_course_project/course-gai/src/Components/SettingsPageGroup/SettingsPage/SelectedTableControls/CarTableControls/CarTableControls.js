import { useEffect, useState } from "react";
import axios from "axios";
import { cleanup } from "@testing-library/react";
import classes from "../CarEquipmentTableControls/CarEquipmentTableControls.module.scss";


const CarTableControls = (props) => {
    const [selectedCarParams, setSelectedCarParams] = useState(null)
    const [selectedCarEquip, setSelectedCarEquip] = useState(null)
    const [selectedCarInfo, setSelectedCarInfo] = useState(null)
    const [carParamsList, setCarParamsList] = useState([])
    const [carEquipList, setCarEquipList] = useState([])
    const [carInfoList, setCarInfoList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        console.log("useEffect RENDER")
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        try {
            axios.get('http://localhost:5000/car_parameters', {cancelToken: source.token}).then(response =>
                {
                    //console.log(response.data.toJSON() + " RESPONSE")
                    setCarParamsList(response.data)
                    setIsLoading(false)
                }
            )
            axios.get('http://localhost:5000/car_equipment', {cancelToken: source.token}).then(response =>
                {
                    //console.log(response.data.toJSON() + " RESPONSE")
                    setCarEquipList(response.data)
                    setIsLoading(false)

                }
            )
            axios.get('http://localhost:5000/car_info', {cancelToken: source.token}).then(response =>
                {
                    //console.log(response.data.toJSON() + " RESPONSE")
                    setCarInfoList(response.data)
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


    return (

        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>

            {isLoading ? <p>Loading</p> : <select style={{marginTop: 25}}>
                { carParamsList.map((element, index) => (
                    <option value={element.uuid} key={index}>
                        {element.brand + " " + element.model + ` : uuid(${element.uuid})`}
                    </option>
                ))}
            </select>}

            {isLoading ? <p>Loading</p> : <select style={{marginTop: 25}}>
                {carEquipList.map((element, index) => (
                    <option value={element.uuid} key={index}>

                        {element.road_sights ? "Дорожные знаки; " : ''}{element.spikes ? "Шипы; " : ''}{element.black_bags ? "Черные мешки; " : ''}{element.emergency_kit ? "СМП" : ''}
                    </option>
                ))}
            </select>}
            {isLoading ? <p>Loading</p> : <select style={{marginTop: 25}}>
                {carInfoList.map((element, index) => (
                    <option value={element.car_infoID} key={index}>
                        {element.government_number + ", Бортовой номер - " + element.onboard_number}
                    </option>
                ))}
            </select>}

            <div style={{marginTop: 25}} className={classes.Buttons}>
                <button>Отчистить</button>
                <button>Отправить</button>
            </div>

        </div>
    )

}
export default CarTableControls