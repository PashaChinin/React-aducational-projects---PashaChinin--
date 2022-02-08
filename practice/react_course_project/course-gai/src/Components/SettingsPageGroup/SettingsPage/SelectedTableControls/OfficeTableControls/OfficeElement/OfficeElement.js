import { useEffect, useState } from "react";
import axios from "axios";
import classes from "../../CarInformationTableControls/CarInfoElement/CarInfoElement.module.scss";

const OfficeElement = (props) => {
    const [isExtended, setIsExtended] = useState(false)
    const [reRender, setReRender] = useState(true)
    const [regionList, setRegionList] = useState(props.regionList)
    const [selectedRegion, setSelectedRegion] = useState(props.item.regionName)
    const [selectedOffice , setSelectedOffice] = useState(props.item.officeName)
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

        await axios.put(`http://localhost:5000/offices/`, {officeId: props.item.officeID,officeName:selectedOffice,regionID:Number(selectedRegion)})
    }
    const deleteOnClickHandler = async () => {

        await axios.delete(`http://localhost:5000/offices/${props.item.uuid}`)
    }

    return (

        <div>
            <div onClick={onElementClickHandler} >On/Off</div>
            {isExtended && isLoaded ? <div className={classes.ElementExtended}>
                    <tr>
                        <td>
                            <div>
                                Управление: <input type={"text"} placeholder={"Название управления"} value={selectedOffice} onChange={(event => setSelectedOffice(event.target.value))}/>
                            </div>

                        </td>
                        <td>
                            <div>
                                Регион:<select onChange={event => setSelectedRegion(event.target.value)}>
                                {regionList.map((element, index) => (
                                    <option value={element.regionID} key={index} selected={props.item.regionID === element.regionID}>
                                        {"ID: " + element.regionID + " | " + element.regionName}
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
                    <div>Название: {props.item.officeName + " (" + props.item.officeID + ")"}</div>
                </div>
            }

        </div>
    )
}
export default OfficeElement