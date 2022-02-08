import classes from "./NavigationBlock.module.scss"
import Logo from "./gailogoLAST.svg"
import NavigationLine from "../Components/LayoutGroup/NavigationLine/NavigationLine";

const NavigationBlock = () => {


    return (
        <div className={classes.NavigationContainer}>
            <div className={classes.line1}>

                <div className={classes.ImageContainer}>
                    <img className={classes.Logo} src={Logo} alt="Логотип ГОИ" style={{fill:"green"}}/>
                </div>
                <div className={classes.OptionsContainer}>
                    <button>Язык</button>
                    <button>Тема</button>
                </div>
            </div>
            <NavigationLine/>

        </div>
    )
}

export default NavigationBlock