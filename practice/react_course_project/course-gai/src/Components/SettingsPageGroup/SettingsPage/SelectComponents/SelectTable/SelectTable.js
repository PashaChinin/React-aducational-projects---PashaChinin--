import { useEffect, useState } from "react";
import axios from "axios";
import { cleanup } from "@testing-library/react";

const SelectTable = (props) => {
    const [tablesList, setTablesList] = useState([])
    const [selectedTable,setSelectedTable] = useState(null)


    useEffect(() => {

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();


            try {
                  axios.get('http://localhost:5000/database_tables', {cancelToken: source.token, timeout: 500}).then(
                    response => {
                        console.log(response.data)
                        setTablesList(response.data)
                    }
                )

            }
            catch (err){if (axios.isCancel(err)) {
                console.log("successfully aborted 1");
            }
            else
            {
                console.log(err)
            }}


        props.setTable(selectedTable)
        return () => {

            source.cancel('Operation cancelled 1')
        }

    }, [props, selectedTable])


    const onChangeEventHandler  =   (event) => {
         setSelectedTable(event.target.value)
        //props.setTable(selectedTable)
        console.log(selectedTable + " SelectTable State")
    }

    return (

        <select value={selectedTable} onChange={onChangeEventHandler}>

            <option value={'default'} disabled selected>--Таблица--</option>
            {tablesList.map((element, index) => (
                <option value={element.table_name} key={index}>
                    {element.table_name}
                </option>
            ))}
        </select>

    )
}
export default SelectTable


