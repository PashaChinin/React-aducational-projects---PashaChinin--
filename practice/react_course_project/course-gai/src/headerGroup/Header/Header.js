import HeaderLineText from "../HeaderLineText/headerLineText";
import SocialNetworkButton from "../SocialNetworkButtons/SocialNetworkButton";
import classes from "../Header/Header.module.scss"

const Header = () => {

    return (
        <div className={classes.Header}>
            <HeaderLineText/>
            <div className={classes.Buttons}>
                <SocialNetworkButton type={'instagram'}/>
                <SocialNetworkButton type={'facebook'}/>
            </div>

        </div>
    )

}
export default Header