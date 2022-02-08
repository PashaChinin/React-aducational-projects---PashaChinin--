import axios from 'axios'
import {useEffect, useState } from "react";
import CarCard from "../CarCard/CarCard"
import SearchBar from "../../SearchBar/SearchBar";
import classes from "./CarsList.module.scss"



const CarsList = () => {
    const [carsList,setCarsList] = useState([])



     useEffect(() => {
         (async () =>{
             try {
                 const response = await axios.get('http://localhost:5000/car')
                     //console.log("Response" + JSON.stringify(response.data))
                 setCarsList(response.data)



             }
             catch (e){console.log(e)}
         })()


    }, [])

    const onSubmit = async (search) => {
        if (search != null) {
            try {
                const response = await axios.get(`http://localhost:5000/car/${search}`)
                setCarsList(response.data)
            } catch (e) {
                console.log(e)
            }
        }
        else if (search == null) {
            try {
                const response = await axios.get('http://localhost:5000/car')


                setCarsList(response.data)


            }
            catch (e){console.log(e)}
        }

    }

    return (
        <div className={classes.CarsListBlock}>
            <div className={classes.SearchBar}><SearchBar onSubmitHandler={onSubmit}/></div>
            {carsList.map( (element, index) => {
                    {console.log('Element' + element)}
                    return (
                        <CarCard
                            key={index}
                            isUsingInShift={element.is_using_in_shift}
                            model={element.model}
                            brand={element.brand}
                            enginePower={element.engine_power}
                            engineVolume={element.engine_volume}
                            engineType={element.engine_type}
                            passedWay={element.passed_way}
                            carImage={element.car_image}
                            roadSights={element.road_sights}
                            spikes={element.spikes}
                            blackBags={element.black_bags}
                            emergencyKit={element.emergency_kit}
                            uuid={element.uuid}
                            govermentNumber={element.government_number}
                            onboardNumber={element.onboard_number}

                        />
                    )
                }
            )}

        </div>


    )

}
export default CarsList
