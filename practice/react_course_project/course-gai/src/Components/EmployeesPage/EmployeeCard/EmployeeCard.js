import classes from './EmployeeCard.module.scss'



const EmployeeCard = (props) => {

    const onClickHandler = () => {
        console.log('CLICK' + props.regionName)
    }


    return (
        <div className={classes.CardContainerBlock}>

            <div onClick={onClickHandler} className={classes.CardContainer}>

                <div className={classes.CardContainerSmall} >
                    <div className={classes.CardContainerSmallName}>
                        {props.employeeSurname + " " + props.employeeName + " " + props.employeeFatherName}
                    </div>
                    <div className={classes.CardContainerSmallInfo}>
                        <div>
                            Тел. {props.employeePhoneNumber}
                        </div>
                        <div>
                            {props.employeePosition}
                        </div>
                    </div>

                </div>
                <div className={classes.CardContainerExpanded}>
                    <div>

                        <div className={classes.EmployeeImageContainer}>
                            <img src={props.employeePhotoPath} style={{width:250, height:250}}/>
                        </div>
                        <div>
                            Используемое авто:
                        </div>
                    </div>
                    <div>

                        <div>
                            <div>Звание: {props.employeeRank}</div>
                            <div>Жетон: {props.employeePrivateTokenNumber}</div>
                            <div>Область: {props.regionName}</div>
                            <div>Отдел: {props.departmentName}</div>
                            <div>Управление: {props.officeName}</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default EmployeeCard