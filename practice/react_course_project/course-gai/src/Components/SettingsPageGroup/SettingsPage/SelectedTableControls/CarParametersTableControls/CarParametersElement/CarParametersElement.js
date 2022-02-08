import { useEffect, useState } from "react";
import axios from "axios";
import classes from "../../CarInformationTableControls/CarInfoElement/CarInfoElement.module.scss";


const CarParametersElement = (props) => {
    const [isExtended, setIsExtended] = useState(false)
    const [reRender, setReRender] = useState(true)
    const [brand, setBrand] = useState(props.item.brand)
    const [model, setModel] = useState(props.item.model)
    const [enginePower, setEnginePower] = useState(props.item.engine_power)
    const [engineType, setEngineType] = useState(props.item.engine_type)
    const [engineVolume, setEngineVolume] = useState(props.item.engine_volume)
    const [passedWay, setPassedWay] = useState(props.item.passed_way)
    const [imageUrl, setImageUrl] = useState(props.item.car_image)


    useEffect(() => {
        console.log("Re-render")
    }, [reRender])

    const onElementClickHandler = () => {
        isExtended ? setIsExtended(!isExtended) : setIsExtended(!isExtended)
    }
    const updateOnClickHandler = async () => {

        await axios.put(`http://localhost:5000/car_parameters/${props.item.uuid}`,
            {
                brand: brand,
                model: model,
                engine_power: enginePower,
                passed_way: passedWay,
                engine_type: engineType,
                engine_volume: engineVolume,
                car_image: imageUrl
            }).then(()=> setReRender(!reRender))
    }
    const deleteOnClickHandler = async () => {

        await axios.delete(`http://localhost:5000/car_parameters/${props.item.uuid}`).then(() => setReRender(!reRender))
    }


    return (
        <div>
            <div onClick={onElementClickHandler} >On/Off</div>
            {isExtended ? <div className={classes.ElementExtended} >
                    <tr>
                        <td>
                            <div>
                                Бренд: <input type={"text"}
                                                              onChange={(e) => {setBrand(e.target.value)}}
                                                              value={brand}
                                                              placeholder={"NOT NULL!"}/>
                            </div>

                        </td>
                        <td>
                            <div>
                                Модель: <input type={"text"}
                                                       onChange={(e) => {setModel(e.target.value)}}
                                                       value={model}
                                                       placeholder={"NOT NULL!"} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                Мощность двигателя: <input type={"text"}
                                                              onChange={(e) => {setEnginePower(e.target.value)}}
                                                              value={enginePower}
                                                              placeholder={"NOT NULL!"}/>
                            </div>

                        </td>
                        <td>
                            <div>
                                Объем двигателя: <input type={"text"}
                                                       onChange={(e) => {setEngineVolume(e.target.value)}}
                                                       value={engineVolume}
                                                       placeholder={"NOT NULL!"} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                Тип двигателя: <input type={"text"}
                                                              onChange={(e) => {setEngineType(e.target.value)}}
                                                              value={engineType}
                                                              placeholder={"NOT NULL!"}/>
                            </div>
                        </td>
                        <td>
                            <div>
                               Пробег: <input type={"text"}
                                                       onChange={(e) => {setPassedWay(e.target.value)}}
                                                       value={passedWay}
                                                       placeholder={"NOT NULL!"} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                Ссылка на фото: <input type={"text"}
                                                      onChange={(e) => {setImageUrl(e.target.value)}}
                                                      value={imageUrl}
                                                      placeholder={"NOT NULL!"}/>
                            </div>

                        </td>
                    </tr>
                    <div>
                        <button onClick={updateOnClickHandler}>Обновить</button><button onClick={deleteOnClickHandler}>Удалить</button>
                    </div>
                </div> :

                <div className={classes.Element} onClick={onElementClickHandler}>
                    <div>ID: {props.item.uuid}</div>
                    <div>Авто: {props.item.brand + " " + props.item.model}</div>
                    {/*<div>Борт.№: {props.item.onboard_number}</div>*/}
                </div>
            }

        </div>
    )

}
export default CarParametersElement