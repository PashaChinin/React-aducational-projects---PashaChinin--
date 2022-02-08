import classes from './CarCard.module.scss'



const CarCard = (props) => {

    const onClickHandler = () => {
        //console.log('CLICK' + props.regionName)
    }


    return (
        <div className={classes.CardContainerBlock}>

            <div onClick={onClickHandler} className={classes.CardContainer}>

                <div className={classes.CardContainerSmall} >
                    <div className={classes.CardContainerSmallName}>
                        {props.brand + " " + props.model + " Гос.Номер: " + props.govermentNumber}
                    </div>
                    <div className={classes.CardContainerSmallInfo}>
                        <div>
                            Бортовой номер -  {props.onboardNumber}
                        </div>
                        <div>
                            {props.employeePosition}
                        </div>
                    </div>

                </div>
                <div className={classes.CardContainerExpanded}>
                    <div>
                        <div className={classes.EmployeeImageContainer}>
                            <img src={props.carImage}/>
                        </div>
                        <div>
                           Находится в смене:{props.isUsingInShift? " Да" : " Нет"}
                        </div>
                    </div>
                    <div>

                        <div style={{marginRight: 10}}>

                            <details>
                                <summary>Характеристики</summary>
                                <br/>
                                <div>Мощность двигателя: {props.enginePower} Л.С</div>
                                <div>Объем двигателя(л): {props.engineVolume}</div>
                                <div>Тип двигателя: {props.engineType}</div>
                                <div>Пробег: {props.passedWay} Км</div>
                                <div>Гос.номер: {props.govermentNumber}</div>
                            </details>

                        </div>

                        <div style={{marginRight: 10}}>

                            <details>
                                <summary>Снаряжение</summary>
                                <br/>
                                <div>Дорожные шипы: {props.spikes ? " Да" : " Нет"}</div>
                                <div>Черные мешки: {props.blackBags? " Да" : " Нет"}</div>
                                <div>Дорожные знаки: {props.roadSights? " Да" : " Нет"}</div>
                                <div>Набор Ч.С.: {props.emergencyKit? " Да" : " Нет"} Км</div>
                            </details>

                        </div>

                    </div>
                </div>

            </div>
        </div>

    )
}

export default CarCard