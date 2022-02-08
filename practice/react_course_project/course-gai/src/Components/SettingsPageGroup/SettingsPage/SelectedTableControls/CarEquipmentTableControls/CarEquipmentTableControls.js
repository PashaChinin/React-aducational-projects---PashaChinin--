import classes from './CarEquipmentTableControls.module.scss'

const CarEquipmentTableControls = () => (

        <div className={classes.CarEquipmentTableControls}>
            <div style={{marginBottom: 20}}>
                <div>Дорожные знаки:    <input type={"checkbox"}/></div>
                <div>Дорожные шипы:     <input type={"checkbox"}/></div>
                <div>Черные мешки:      <input type={"checkbox"}/></div>
                <div>Комплект СМП:      <input type={"checkbox"}/></div>
            </div>
            <div className={classes.Buttons}>
                <button>Отчистить</button>
                <button>Отправить</button>
            </div>

        </div>

)
export default CarEquipmentTableControls