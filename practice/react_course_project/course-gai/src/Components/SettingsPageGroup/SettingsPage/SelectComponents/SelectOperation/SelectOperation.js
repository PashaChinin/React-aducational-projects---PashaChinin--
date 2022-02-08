import { useEffect, useState } from "react";
import axios from "axios";

const SelectOperation = (props) => {
    const [optionsList, setOptionsList] = useState([
        {option: 'post(CREATE)'},
        {option: 'get(READ)'},
        {option: 'put(UPDATE)'},
        {option: 'delete(DELETE)'},
        {option: 'get(FIND)'}
    ])
    const [selectedOption, setSelectedOption] = useState(null)

    useEffect(()=> {
        //console.log("selected option is (useEffect) - " + selectedOption)
        props.setOption(selectedOption)

    }, [selectedOption])



    return (

        <select value={selectedOption} onChange={(e)=> {
            setSelectedOption(e.target.value)
            //console.log('selected option is -'+ selectedOption)

        }
        }>
            <option value={"default"} selected disabled>--Операция--</option>
            {optionsList.map((element, index) => (
                <option value={element.option} key={index}>
                    {element.option}
                </option>
            ))}
        </select>

    )
}
export default SelectOperation


