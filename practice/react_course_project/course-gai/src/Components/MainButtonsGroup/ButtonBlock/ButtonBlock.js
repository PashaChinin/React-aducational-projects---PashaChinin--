import Button from "../Button/Button";
import classes from './ButtonBlock.module.scss'
// eslint-disable-next-line
import {useNavigate} from "react-router-dom";




const ButtonBlock = props => {
 const navigate = useNavigate();

    const onClickHandler = (type) => {

        switch (type)
        {
            case 'car': navigate('/car');
            break;

            case 'personal': navigate('/employees');
            break;

            case 'settings': navigate('/settings');
            break;

            default: navigate('/')
        }



    }

    return (
    <div className={classes.ButtonBlockContainer}>


        <Button onClick={ () => onClickHandler('car')} text={'Автопарк'} type={'car'}/>


        <Button onClick={ () => onClickHandler('personal')} text={'Сотрудники'} type={'personal'}/>


        <Button onClick={ () => onClickHandler('settings')} text={'Управление'} type={'settings'}/>


    </div>
    )
}
export default ButtonBlock