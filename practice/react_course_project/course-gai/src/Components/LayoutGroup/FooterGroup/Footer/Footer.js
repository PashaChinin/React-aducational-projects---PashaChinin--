import classes from './Footer.module.scss'
import Logo from "../../../../NavigationLineGroup/gailogoLAST.svg";
import SocialNetworkButton from "../../../../headerGroup/SocialNetworkButtons/SocialNetworkButton";
import Contacts from "../Contacts/Contacts";

const Footer = () => (

    <div className={classes.FooterContainer}>
        <div className={classes.FooterLine1}>
            <div className={classes.FooterImageContainer}>
                <img className={classes.Logo} src={Logo} alt="Логотип ГОИ"/>
            </div>
            <div className={classes.SocialNetworkContainer}>
                <SocialNetworkButton type={'facebook'} width={40} height={40} />
                <SocialNetworkButton type={'instagram'} width={40} height={40}/>
            </div>
            <div className={classes.ContactContainer}>
                <Contacts/>
            </div>
        </div >
        <div className={classes.FooterLine2}>
            Copyright ChininPavel.inc 2000-2022
        </div>
    </div>
)
export default Footer