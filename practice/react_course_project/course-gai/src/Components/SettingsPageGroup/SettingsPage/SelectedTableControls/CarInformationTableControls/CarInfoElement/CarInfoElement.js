import classes from './CarInfoElement.module.scss'
import {useNavigate} from 'react-router-dom'
import carInfoElementExtended from "./CarInfoElementExtended";
import { useEffect, useState } from "react";
import CarInfoElementExtended from "./CarInfoElementExtended";
import axios from "axios";

const CarInfoElement = (props) => {
    const [isExtended, setIsExtended] = useState(false)
    const [governmentNumber, setGovernmentNumber] = useState(props.item.government_number)
    const [onBoardNumber, setOnBoardNumber] = useState(props.item.onboard_number)
    const [reRender, setReRender] = useState(true)


    useEffect(() => {
        console.log("Re-render")
    }, [reRender])

    const onElementClickHandler = () => {
        isExtended ? setIsExtended(!isExtended) : setIsExtended(!isExtended)
    }
    const updateOnClickHandler = async () => {

        await axios.put(`http://localhost:5000/car_info/`, {id:props.item.car_infoID,governmentNumber:governmentNumber,onBoardNumber:onBoardNumber})
    }
    const deleteOnClickHandler = async () => {

       await axios.delete(`http://localhost:5000/car_info/${props.item.car_infoID}`)
    }

    return (

        <div>
            <div onClick={onElementClickHandler} >On/Off</div>
            {isExtended ? <div className={classes.ElementExtended} >
                    <tr>
                        <td>
                            <div>
                                Государсветнный номер: <input type={"text"}
                                                              onChange={(e) => {setGovernmentNumber(e.target.value)}}
                                                              value={governmentNumber}
                                                              placeholder={"NOT NULL!"}/>
                            </div>

                        </td>
                        <td>
                            <div>
                                Бортовой номер: <input type={"text"}
                                                       onChange={(e) => {setOnBoardNumber(e.target.value)}}
                                                       value={onBoardNumber}
                                                       placeholder={"NOT NULL!"} />
                            </div>
                        </td>
                    </tr>
                    <div>
                        <button onClick={updateOnClickHandler}>Обновить</button><button onClick={deleteOnClickHandler}>Удалить</button>
                    </div>
                </div> :

                <div className={classes.Element} onClick={onElementClickHandler}>
                    <div>ID: {props.item.car_infoID}</div>
                    <div>Г.Н: {props.item.government_number}</div>
                    <div>Борт.№: {props.item.onboard_number}</div>
                </div>
            }

        </div>
    )
}
export default CarInfoElement