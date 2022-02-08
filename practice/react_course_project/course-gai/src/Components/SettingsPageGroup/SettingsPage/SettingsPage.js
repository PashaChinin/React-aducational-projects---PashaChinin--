import classes from "./SettingsPage.module.scss"
import SelectTable from "./SelectComponents/SelectTable/SelectTable";
import SelectOperation from "./SelectComponents/SelectOperation/SelectOperation";
import { useState } from "react";
import SwitchSelectedTable from "./SwitchSelectedTable/SwitchSelectedtable";
import PreAuthorizationPage from "../PreAutorizationPage/PreAutorizationPage";




const SettingsPage = () => {

    const [selectedTable, setSelectedTable] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const getTableFromSelectTable = async (table) => {
        await setSelectedTable(table)
        //console.log(selectedTable + " SettingsPage State")
    }
    const getOptionFromSelectOption = async (option) => {
       // console.log("getOptionFromSelectOption option - " + option)
        await setSelectedOption(option)
    }

    return (
        isLoggedIn ?
        <div className={classes.SettingsContainer}>
            <div className={classes.SelectBlock}>
                <div style={{margin: 20}}>
                    <SelectTable setTable={getTableFromSelectTable}/>
                </div>
                {/*<div style={{margin: 20}}>*/}
                {/*    <SelectOperation setOption={getOptionFromSelectOption}/>*/}
                {/*</div>*/}

            </div>
            <div className={classes.ActionBlock}>
                <SwitchSelectedTable table={selectedTable} option={selectedOption}/>
            </div>
        </div>
            : <PreAuthorizationPage getIsLogged={(value) => {setIsLoggedIn(value)}}/>
    )
}
export default SettingsPage