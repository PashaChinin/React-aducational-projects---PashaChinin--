import classes from "../CarEquipmentTableControls/CarEquipmentTableControls.module.scss";
import { useState } from "react";
import axios from "axios";

const CarInformationTableControls = (props) => {
    const [governmentNumber, setGovernmentNumber] =  useState("")
    const [onBoardNumber, setOnBoardNumber] =  useState("")
    const [carInfoId, setCarInfoId] =  useState("")
    const [response, setResponse] = useState([])

    const onClickSubmitOperationHandler = () => {
        console.log("Selected Operation - " + props.operation)
        switch (props.operation) {

            case'post(CREATE)':
                axios.post('http://localhost:5000/car_info', {government_number:governmentNumber,onboard_number: onBoardNumber}).then( (response)=> {
                    setResponse(response)
                } )

                break
            case 'get(READ)' :
                axios.get('http://localhost:5000/car_info').then( (response)=> {
                    setResponse(response)
                } )
                break
            case 'put(UPDATE)':
                axios.put(`http://localhost:5000/car_info/${governmentNumber}`, {government_number:governmentNumber,onboard_number: onBoardNumber}).then( (response)=> {
                    setResponse(response)
                } )
                break
            case 'delete(DELETE)' :
                axios.delete(`http://localhost:5000/car_info/${governmentNumber}`).then( (response)=> {
                    setResponse(response)
                } )
                break
            case 'get(FIND)':
                axios.get(`http://localhost:5000/car_info/${governmentNumber}`).then( (response)=> {
                    setResponse(response)
                } )
                break
            default:


        }
    }


    return (
    <div className={classes.CarEquipmentTableControls}>
        {

             props.operation === "post(CREATE)" ?
          <div>
            <div style={{marginBottom: 20}}>
                <div>Государственный номер: <input value={governmentNumber} id={"governmentNumInput"} type={"text"}
                                                   onChange={(e) => setGovernmentNumber(e.target.value)}/></div>
                <div>Бортовой номер: <input value={onBoardNumber} id={"onBoardNumInput"} type={"text"}
                                            onChange={(e) => setOnBoardNumber(e.target.value)}/></div>
            </div>
            <div className={classes.Buttons}>
            <button>Отчистить</button>
            <button onClick={onClickSubmitOperationHandler}>Отправить</button>
            </div>
          </div>
            : null
        }
        <div>
            {props.operation === "get(READ)" ? <button onClick={onClickSubmitOperationHandler}>Получить список</button> : null}
            {props.operation === "put(UPDATE)" ?
                <div>
                    <div>
                        <div style={{marginBottom: 20}}>
                            <div>Государственный номер: <input value={governmentNumber} id={"governmentNumInput"} type={"text"}
                                                               onChange={(e) => setGovernmentNumber(e.target.value)}/></div>
                            <div>Бортовой номер: <input value={onBoardNumber} id={"onBoardNumInput"} type={"text"}
                                                        onChange={(e) => setOnBoardNumber(e.target.value)}/></div>
                        </div>
                        <div className={classes.Buttons}>
                            <button>Отчистить</button>
                            <button onClick={onClickSubmitOperationHandler}>Отправить</button>
                        </div>
                    </div>
                    <input onChange={event => setCarInfoId(event.target.value)} type={"text"} value={carInfoId} placeholder={"id обновляемого элемента"}/>
                    <button onClick={onClickSubmitOperationHandler}>Обновить запись</button>
                </div>


                : null}
            {props.operation === "delete(DELETE)" ?
                <div>
                    <input onChange={event => setGovernmentNumber(event.target.value)} type={"text"} value={governmentNumber} placeholder={"номер удаляемого элемента"}/>
                    <button onClick={onClickSubmitOperationHandler}>Удалить запись</button>
                </div>


                : null}
            {props.operation === "get(FIND)" ?
                <div>
                    <input onChange={event => setGovernmentNumber(event.target.value)} type={"text"} value={governmentNumber} placeholder={"гос. номер для поиска"}/>
                    <button onClick={onClickSubmitOperationHandler}>Найти запись</button>
                </div>


                : null}

        </div>
        <div style={{marginTop: 20}}>
            Ответ сервера на запрос:
        </div>
        <div>{JSON.stringify(response.data)}</div>

    </div>
    )
}
export default CarInformationTableControls