import { useEffect, useState } from "react";
import axios from "axios";
import classes from "../CarEquipmentTableControls/CarEquipmentTableControls.module.scss";
import OfficeElement from "./OfficeElement/OfficeElement";


const OfficeTableControls = (props) => {
    const [selectedRegion, setSelectedRegion] = useState(null)
    const [officeList, setOfficeList] = useState([])
    const [regionList, setRegionList] = useState([])
    const [officeName, setOfficeName] = useState(null)
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
            })
            axios.get('http://localhost:5000/offices', {cancelToken: source.token}).then(response =>
                {
                    //console.log(response.data.toJSON() + " RESPONSE")
                    setOfficeList(response.data)
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
        await axios.post('http://localhost:5000/offices', {officeName: officeName, regionId: selectedRegion})
    }
    const onClickClearEventHandler =  () => {

    }


    return (

        <div>
            <div>
                Название управления: <input type={"text"} placeholder={"Название управления"} onChange={(e => setOfficeName(e.target.value))}/>
            </div>
            {isLoading ? <p>Loading</p> : <select onChange={e => setSelectedRegion(e.target.value)}>
                <option value={null}>Не выбрано</option>
                { regionList.map((element, index) => (
                    <option value={element.regionID} key={index}>
                        {element.regionName + ` : id(${element.regionID})`}
                    </option>
                ))}
            </select>}

            <div style={{marginTop: 25}} className={classes.Buttons}>
                <button>Отчистить</button>
                <button onClick={onClickSubmitEventHandler}>Отправить</button>
            </div>
            <div style={{marginTop: 30}} >


                <div>
                    {officeList.map((element, index) => (
                        <OfficeElement
                            key={index}
                            item={element}
                            regionList={regionList}
                        />
                    ))}
                </div>
            </div>


        </div>
    )

}
export default OfficeTableControls