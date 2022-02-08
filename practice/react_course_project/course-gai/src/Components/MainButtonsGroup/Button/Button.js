import classes from './Button.module.scss'
import CarLogo from '../../../images/car-logo.svg'
import PersonalLogo from '../../../images/personal-icon.svg'
import SettingsLogo from '../../../images/settings-icon.svg';


const Button = (props) => {
    let button;
    if (props.type === 'car')
        button =  <div onClick={props.onClick} className={classes.ImageContainer}> <img src={CarLogo} alt='Автопарк'/> </div>
    else if (props.type === 'personal')
        button =  <div onClick={props.onClick} className={classes.ImageContainer}> <img src={PersonalLogo} alt='Наш персонал'/> </div>
    else if (props.type === 'settings')
        button =  <div onClick={props.onClick} className={classes.ImageContainer}> <img src={SettingsLogo} alt='Управление'/> </div>

    return (
    <div className={classes.ButtonContainer}>
        <div className={classes.ButtonName}>
            {props.text}
        </div>
        {button}

    </div>
    )
}
export default Button