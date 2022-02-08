import { useEffect, useState } from "react";
import axios from "axios";
import { cleanup } from "@testing-library/react";
import classes from "../CarEquipmentTableControls/CarEquipmentTableControls.module.scss";


const RegionTableControls = (props) => {
    const [selectedRegion, setSelectedRegion] = useState(null)
    const [regionList, setRegionList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        console.log("useEffect RENDER")
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        try {
            axios.get('http://localhost:5000/regions', {cancelToken: source.token}).then(response =>
                {
                    //console.log(response.data.toJSON() + " RESPONSE")
                    setRegionList(response.data)
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

    const onSubmitClickHandler = async () => {
        await axios.post('http://localhost:5000/regions', {regionName: selectedRegion,
            regionShortCode: "NRG"})
    }


    return (

        <div>
            <div>
                Название региона: <input onChange={event => setSelectedRegion(event.target.value)} type={"text"}/>
            </div>
            {console.log("Select RENDER")}
            {isLoading ? <p>Loading</p> : <select>
                { regionList.map((element, index) => (
                    <option value={element.uuid} key={index}>
                        {element.regionName + ` : uuid(${element.uuid})`}
                    </option>
                ))}
            </select>}

            <div style={{marginTop: 25}} className={classes.Buttons}>
                <button>Отчистить</button>
                <button onClick={onSubmitClickHandler}>Отправить</button>
            </div>

        </div>
    )

}
export default RegionTableControls