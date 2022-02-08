import axios from 'axios'
import {useEffect, useState } from "react";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import SearchBar from "../../SearchBar/SearchBar";
import classes from "./EmployeeList.module.scss"


const EmployeesList = () => {
    const [employeesList,setEmployeesList] = useState([])



    useEffect(() => {

        (async () =>  {
        try {

            const response = await axios.get('http://localhost:5000/employee')
            //console.log("Response в DidMount" + JSON.stringify(response.data))
            setEmployeesList(response.data)

        }
        catch (e){console.log(e)}

    })()}, [])

    const onSubmit = async (search) => {
        if (search != null) {
            try {
                const response = await axios.get(`http://localhost:5000/employee/${search}`)
                setEmployeesList(response.data)
            } catch (e) {
                console.log(e)
            }
        }
        else if (search == null) {
            try {
                const response = await axios.get('http://localhost:5000/employee')


                setEmployeesList(response.data)


            }
            catch (e){console.log(e)}
        }

    }

    return (
        <div className={classes.EmployeesListBlock}>
            <div className={classes.SearchBar}><SearchBar onSubmitHandler={onSubmit}/></div>
            {employeesList.map( (element, index) => {
                    {console.log('Element' + element)}
                    return (
                        <EmployeeCard
                            key={index}
                            employeeName={element.employeeName}
                            employeeSurname={element.employeeSurname}
                            employeeFatherName={element.employeeFatherName}
                            employeePhoneNumber={element.employeePhoneNumber}
                            employeeRank={element.employeeRank}
                            employeePosition={element.employeePosition}
                            employeePrivateTokenNumber={element.employeePrivateTokenNumber}
                            employeePhotoPath={element.employeePhotoPath}
                            departmentName={element.departmentName}
                            officeName={element.officeName}
                            regionName={element.regionName}

                        />
                    )
                }
            )}

        </div>


    )

}
export default EmployeesList
